const express = require("express");
const prisma = require("../lib/prisma");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

/*
  HELPER
  Convert a value to a valid positive monetary amount.
*/
const parseAmount = (amount) => {
  if (
    amount === null ||
    amount === undefined ||
    amount === ""
  ) {
    return null;
  }

  const parsed = Number(amount);

  if (!Number.isFinite(parsed)) {
    return null;
  }

  if (parsed <= 0) {
    return null;
  }

  /*
    Restrict transfers to 2 decimal places.
  */
  if (
    !Number.isInteger(
      parsed * 100
    )
  ) {
    return null;
  }

  return parsed;
};


/*
  HELPER
  Convert Prisma Decimal values safely to numbers.
*/
const decimalToNumber = (value) => {
  if (
    value === null ||
    value === undefined
  ) {
    return 0;
  }

  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : 0;
};


/*
  LOOK UP AN ACCOUNT
*/
router.get(
  "/lookup/:accountNumber",
  authenticateToken,
  async (req, res) => {
    try {
      const accountNumber =
        String(
          req.params.accountNumber || ""
        ).trim();

      /*
        Validate account number.
      */
      if (!accountNumber) {
        return res.status(400).json({
          message:
            "Please provide an account number.",
        });
      }

      /*
        Find recipient account.
      */
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

      /*
        Account does not exist.
      */
      if (!account) {
        return res.status(404).json({
          message:
            "Account not found.",
        });
      }

      /*
        Return only the information
        needed by the frontend.
      */
      return res.json({
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

      return res.status(500).json({
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
        The user ID comes from the
        verified JWT.

        It is NOT taken from the
        frontend request.
      */
      const userId =
        req.user.userId;

      if (!userId) {
        return res.status(401).json({
          message:
            "Invalid authentication token.",
        });
      }

      /*
        Only retrieve transactions
        belonging to the logged-in user.
      */
      const transactions =
        await prisma.transaction.findMany({
          where: {
            userId,
          },

          orderBy: {
            createdAt: "desc",
          },
        });

      return res.json({
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
                transaction.createdAt.toISOString(),
            })
          ),
      });

    } catch (error) {
      console.error(
        "Transaction history error:",
        error
      );

      return res.status(500).json({
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
        The sender MUST come from
        the authenticated JWT.

        Never trust a sender ID
        supplied by the frontend.
      */
      const senderId =
        req.user.userId;

      if (!senderId) {
        return res.status(401).json({
          message:
            "Invalid authentication token.",
        });
      }

      const {
        recipientAccountNumber,
        amount,
        description,
      } = req.body || {};

      /*
        NORMALISE ACCOUNT NUMBER
      */
      const recipientNumber =
        String(
          recipientAccountNumber || ""
        ).trim();

      /*
        VALIDATE ACCOUNT NUMBER
      */
      if (!recipientNumber) {
        return res.status(400).json({
          message:
            "Please provide a recipient account number.",
        });
      }

      /*
        VALIDATE AMOUNT
      */
      const transferAmount =
        parseAmount(amount);

      if (
        transferAmount === null
      ) {
        return res.status(400).json({
          message:
            "Please provide a valid transfer amount with a maximum of 2 decimal places.",
        });
      }

      /*
        CLEAN DESCRIPTION
      */
      const cleanDescription =
        typeof description ===
        "string"
          ? description.trim()
          : "";

      /*
        Prevent excessively large
        descriptions.
      */
      if (
        cleanDescription.length >
        255
      ) {
        return res.status(400).json({
          message:
            "Transfer description is too long.",
        });
      }

      /*
        PERFORM EVERYTHING INSIDE
        ONE DATABASE TRANSACTION.

        If any part fails, Prisma
        rolls the entire operation back.
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
                  user: {
                    select: {
                      id: true,
                      firstName: true,
                      lastName: true,
                    },
                  },
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
                    recipientNumber,
                },

                include: {
                  user: {
                    select: {
                      id: true,
                      firstName: true,
                      lastName: true,
                    },
                  },
                },
              });

            if (!recipientAccount) {
              const error =
                new Error(
                  "Recipient account not found."
                );

              error.code =
                "RECIPIENT_NOT_FOUND";

              throw error;
            }

            /*
              PREVENT SELF TRANSFER
            */
            if (
              senderAccount.userId ===
              recipientAccount.userId
            ) {
              const error =
                new Error(
                  "You cannot transfer money to yourself."
                );

              error.code =
                "SELF_TRANSFER";

              throw error;
            }

            /*
              GET SENDER BALANCE
            */
            const senderBalance =
              decimalToNumber(
                senderAccount.balance
              );

            /*
              CHECK BALANCE
            */
            if (
              senderBalance <
              transferAmount
            ) {
              const error =
                new Error(
                  "Insufficient balance."
                );

              error.code =
                "INSUFFICIENT_BALANCE";

              throw error;
            }

            /*
              ROUND THE AMOUNT TO
              TWO DECIMAL PLACES.

              This keeps monetary values
              consistent.
            */
            const amountForDatabase =
              Math.round(
                transferAmount * 100
              ) / 100;

            /*
              REMOVE MONEY FROM SENDER
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
                      amountForDatabase,
                  },
                },
              });

            /*
              ADD MONEY TO RECIPIENT
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
                      amountForDatabase,
                  },
                },
              });

            /*
              CREATE ONE SHARED TIMESTAMP
              FOR THE TRANSFER.
            */
            const transferDate =
              new Date();

            /*
              DEFAULT DESCRIPTION
            */
            const senderDescription =
              cleanDescription ||
              `Transfer to ${recipientAccount.user.firstName} ${recipientAccount.user.lastName}`;

            const recipientDescription =
              cleanDescription ||
              `Transfer from ${senderAccount.user.firstName} ${senderAccount.user.lastName}`;

            /*
              CREATE SENDER TRANSACTION
            */
            const senderTransaction =
              await tx.transaction.create({
                data: {
                  userId:
                    senderId,

                  type:
                    "debit",

                  amount:
                    amountForDatabase,

                  description:
                    senderDescription,

                  status:
                    "completed",

                  createdAt:
                    transferDate,
                },
              });

            /*
              CREATE RECIPIENT TRANSACTION
            */
            const recipientTransaction =
              await tx.transaction.create({
                data: {
                  userId:
                    recipientAccount.userId,

                  type:
                    "credit",

                  amount:
                    amountForDatabase,

                  description:
                    recipientDescription,

                  status:
                    "completed",

                  createdAt:
                    transferDate,
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
                    amountForDatabase,

                  status:
                    "completed",

                  createdAt:
                    transferDate,
                },
              });

            /*
              RETURN ALL INFORMATION
              REQUIRED BY THE FRONTEND.
            */
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
        SUCCESS RESPONSE
      */
      return res.status(200).json({
        message:
          "Transfer completed successfully.",

        transfer: {
          id:
            result.transfer.id,

          senderId:
            result.transfer.senderId,

          recipientId:
            result.transfer.recipientId,

          amount:
            result.transfer.amount.toString(),

          status:
            result.transfer.status,

          createdAt:
            result.transfer.createdAt.toISOString(),
        },

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
            result.senderTransaction.createdAt.toISOString(),
        },

        recipient:
          result.recipient,

        newBalance:
          decimalToNumber(
            result.senderAccount.balance
          ),
      });

    } catch (error) {
      console.error(
        "Transfer error:",
        error
      );

      /*
        KNOWN BUSINESS ERRORS
      */
      if (
        error.code ===
        "RECIPIENT_NOT_FOUND"
      ) {
        return res.status(404).json({
          message:
            "Recipient account not found.",
        });
      }

      if (
        error.code ===
        "SELF_TRANSFER"
      ) {
        return res.status(400).json({
          message:
            "You cannot transfer money to yourself.",
        });
      }

      if (
        error.code ===
        "INSUFFICIENT_BALANCE"
      ) {
        return res.status(400).json({
          message:
            "Insufficient balance.",
        });
      }

      /*
        Handle Prisma/database errors
        without exposing internal
        database information to the user.
      */
      if (
        error.code &&
        typeof error.code ===
          "string" &&
        error.code.startsWith("P")
      ) {
        return res.status(500).json({
          message:
            "Unable to complete transfer. Please try again.",
        });
      }

      /*
        Generic server error.
      */
      return res.status(500).json({
        message:
          "Unable to complete transfer. Please try again.",
      });
    }
  }
);


module.exports = router;