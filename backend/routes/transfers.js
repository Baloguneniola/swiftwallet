const express = require("express");
const jwt = require("jsonwebtoken");
const prisma = require("../lib/prisma");

const router = express.Router();

/*
  JWT AUTHENTICATION MIDDLEWARE
*/
const authenticateToken = (req, res, next) => {
  const authHeader =
    req.headers.authorization;

  const token =
    authHeader &&
    authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

  if (!token) {
    return res.status(401).json({
      message:
        "Access denied. No token provided.",
    });
  }

  try {
    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({
      message:
        "Invalid or expired authentication token.",
    });
  }
};

/*
  LOOK UP AN ACCOUNT
*/
router.get(
  "/lookup/:accountNumber",
  authenticateToken,
  async (req, res) => {
    try {
      const {
        accountNumber,
      } = req.params;

      const account =
        await prisma.account.findUnique({
          where: {
            accountNumber,
          },

          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        });

      if (!account) {
        return res.status(404).json({
          message:
            "Account not found.",
        });
      }

      res.json({
        accountNumber:
          account.accountNumber,

        bank:
          "Swift Wallet",

        user: {
          id:
            account.user.id,

          name:
            `${account.user.firstName} ${account.user.lastName}`.trim(),
        },
      });
    } catch (error) {
      console.error(
        "Account lookup error:",
        error
      );

      res.status(500).json({
        message:
          "Unable to look up account.",
      });
    }
  }
);


/*
  GET LOGGED-IN USER'S
  TRANSACTION HISTORY
*/
router.get(
  "/",
  authenticateToken,
  async (req, res) => {
    try {
      /*
        GET USER FROM JWT
      */
      const userId =
        req.user.userId;

      const transactions =
        await prisma.transaction.findMany({
          where: {
            userId,
          },

          orderBy: {
            createdAt:
              "desc",
          },
        });

      res.json({
        transactions:
          transactions.map(
            (transaction) => ({
              id:
                transaction.id,

              type:
                transaction.type,

              amount:
                transaction.amount.toString(),

              description:
                transaction.description ||
                "",

              status:
                transaction.status,

              createdAt:
                transaction.createdAt,
            })
          ),
      });
    } catch (error) {
      console.error(
        "Transaction history error:",
        error
      );

      res.status(500).json({
        message:
          "Unable to retrieve transaction history.",
      });
    }
  }
);


/*
  MAKE A TRANSFER
*/
router.post(
  "/",
  authenticateToken,
  async (req, res) => {
    try {
      /*
        GET REAL SENDER
        FROM JWT
      */
      const senderId =
        req.user.userId;

      const {
        recipientAccountNumber,
        amount,
        description,
      } = req.body;

      const transferAmount =
        Number(amount);

      /*
        VALIDATE TRANSFER
      */
      if (
        !recipientAccountNumber ||
        !transferAmount ||
        transferAmount <= 0
      ) {
        return res.status(400).json({
          message:
            "Please provide valid transfer information.",
        });
      }

      /*
        PERFORM TRANSFER
        INSIDE DATABASE TRANSACTION
      */
      const result =
        await prisma.$transaction(
          async (tx) => {
            /*
              FIND SENDER ACCOUNT
            */
            const senderAccount =
              await tx.account.findUnique({
                where: {
                  userId:
                    senderId,
                },

                include: {
                  user: true,
                },
              });

            if (!senderAccount) {
              throw new Error(
                "Sender account not found."
              );
            }

            /*
              FIND RECIPIENT ACCOUNT
            */
            const recipientAccount =
              await tx.account.findUnique({
                where: {
                  accountNumber:
                    recipientAccountNumber,
                },

                include: {
                  user: true,
                },
              });

            if (!recipientAccount) {
              throw new Error(
                "Recipient account not found."
              );
            }

            /*
              PREVENT SELF TRANSFER
            */
            if (
              senderAccount.userId ===
              recipientAccount.userId
            ) {
              throw new Error(
                "You cannot transfer money to yourself."
              );
            }

            /*
              CHECK BALANCE
            */
            if (
              Number(
                senderAccount.balance
              ) < transferAmount
            ) {
              throw new Error(
                "Insufficient balance."
              );
            }

            /*
              REMOVE MONEY
              FROM SENDER
            */
            const updatedSenderAccount =
              await tx.account.update({
                where: {
                  id:
                    senderAccount.id,
                },

                data: {
                  balance: {
                    decrement:
                      transferAmount,
                  },
                },
              });

            /*
              ADD MONEY
              TO RECIPIENT
            */
            const updatedRecipientAccount =
              await tx.account.update({
                where: {
                  id:
                    recipientAccount.id,
                },

                data: {
                  balance: {
                    increment:
                      transferAmount,
                  },
                },
              });

            /*
              CREATE SENDER
              TRANSACTION
            */
            const senderTransaction =
              await tx.transaction.create({
                data: {
                  userId:
                    senderId,

                  type:
                    "debit",

                  amount:
                    transferAmount,

                  description:
                    description ||
                    `Transfer to ${recipientAccount.user.firstName} ${recipientAccount.user.lastName}`,

                  status:
                    "completed",
                },
              });

            /*
              CREATE RECIPIENT
              TRANSACTION
            */
            const recipientTransaction =
              await tx.transaction.create({
                data: {
                  userId:
                    recipientAccount.userId,

                  type:
                    "credit",

                  amount:
                    transferAmount,

                  description:
                    description ||
                    `Transfer from ${senderAccount.user.firstName} ${senderAccount.user.lastName}`,

                  status:
                    "completed",
                },
              });

            /*
              CREATE TRANSFER RECORD
            */
            const transfer =
              await tx.transfer.create({
                data: {
                  senderId,

                  recipientId:
                    recipientAccount.userId,

                  amount:
                    transferAmount,

                  status:
                    "completed",
                },
              });

            return {
              senderAccount:
                updatedSenderAccount,

              recipientAccount:
                updatedRecipientAccount,

              recipient: {
                id:
                  recipientAccount.user.id,

                name:
                  `${recipientAccount.user.firstName} ${recipientAccount.user.lastName}`.trim(),

                accountNumber:
                  recipientAccount.accountNumber,
              },

              senderTransaction,

              recipientTransaction,

              transfer,
            };
          }
        );

      /*
        SEND SUCCESS RESPONSE
      */
      res.json({
        message:
          "Transfer completed successfully.",

        transfer:
          result.transfer,

        transaction: {
          id:
            result.senderTransaction.id,

          type:
            result.senderTransaction.type,

          amount:
            result.senderTransaction.amount.toString(),

          description:
            result.senderTransaction.description,

          status:
            result.senderTransaction.status,

          createdAt:
            result.senderTransaction.createdAt,
        },

        recipient:
          result.recipient,

        newBalance:
          Number(
            result.senderAccount.balance
          ),
      });
    } catch (error) {
      console.error(
        "Transfer error:",
        error
      );

      res.status(400).json({
        message:
          error.message ||
          "Unable to complete transfer.",
      });
    }
  }
);

module.exports = router;