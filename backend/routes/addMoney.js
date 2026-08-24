const express = require("express");
const jwt = require("jsonwebtoken");
const prisma = require("../lib/prisma");

const router = express.Router();

/*
  JWT AUTHENTICATION MIDDLEWARE
*/
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token =
    authHeader &&
    authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

  if (!token) {
    return res.status(401).json({
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(
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
  ADD MONEY
*/
router.post(
  "/",
  authenticateToken,
  async (req, res) => {
    try {
      /*
        GET LOGGED-IN USER
        FROM JWT
      */
      const userId = req.user.userId;

      const { amount } = req.body;

      const addAmount = Number(amount);

      /*
        VALIDATE AMOUNT
      */
      if (
        !Number.isFinite(addAmount) ||
        addAmount <= 0
      ) {
        return res.status(400).json({
          message:
            "Please provide a valid amount.",
        });
      }

      /*
        UPDATE BALANCE AND CREATE
        TRANSACTION TOGETHER
      */
      const result =
        await prisma.$transaction(
          async (tx) => {
            /*
              FIND USER ACCOUNT
            */
            const account =
              await tx.account.findUnique({
                where: {
                  userId,
                },
              });

            if (!account) {
              throw new Error(
                "Account not found."
              );
            }

            /*
              ADD MONEY TO BALANCE
            */
            const updatedAccount =
              await tx.account.update({
                where: {
                  id: account.id,
                },

                data: {
                  balance: {
                    increment:
                      addAmount,
                  },
                },
              });

            /*
              CREATE TRANSACTION
            */
            const transaction =
              await tx.transaction.create({
                data: {
                  userId,

                  type: "credit",

                  amount:
                    addAmount,

                  description:
                    "Wallet Top Up",

                  status:
                    "completed",
                },
              });

            return {
              account:
                updatedAccount,

              transaction,
            };
          }
        );

      /*
        SEND SUCCESS RESPONSE
      */
      res.json({
        message:
          "Money added successfully.",

        newBalance:
          Number(
            result.account.balance
          ),

        transaction: {
          id:
            result.transaction.id,

          type:
            result.transaction.type,

          amount:
            result.transaction.amount.toString(),

          description:
            result.transaction.description,

          status:
            result.transaction.status,

          createdAt:
            result.transaction.createdAt.toISOString(),
        },
      });

    } catch (error) {
      console.error(
        "Add money error:",
        error
      );

      res.status(400).json({
        message:
          error.message ||
          "Unable to add money.",
      });
    }
  }
);

module.exports = router;