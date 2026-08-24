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
  PAY BILL
*/
router.post(
  "/",
  authenticateToken,
  async (req, res) => {
    try {
      /*
        GET USER FROM JWT
      */
      const userId = req.user.userId;

      const {
        selectedBill,
        provider,
        accountNumber,
        amount,
      } = req.body;

      /*
        VALIDATE REQUIRED INFORMATION
      */
      if (
        !selectedBill ||
        !provider ||
        !accountNumber ||
        amount === undefined ||
        amount === null
      ) {
        return res.status(400).json({
          message:
            "Bill payment information is required.",
        });
      }

      /*
        CONVERT AMOUNT TO NUMBER
      */
      const billAmount = Number(amount);

      /*
        VALIDATE AMOUNT
      */
      if (
        !Number.isFinite(billAmount) ||
        billAmount <= 0
      ) {
        return res.status(400).json({
          message:
            "Please provide a valid payment amount.",
        });
      }

      /*
        PROCESS EVERYTHING
        INSIDE ONE DATABASE TRANSACTION
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
              CHECK BALANCE
            */
            const currentBalance =
              Number(account.balance);

            if (
              billAmount >
              currentBalance
            ) {
              throw new Error(
                "Insufficient balance."
              );
            }

            /*
              CALCULATE NEW BALANCE
            */
            const newBalance =
              currentBalance -
              billAmount;

            /*
              UPDATE ACCOUNT BALANCE
            */
            const updatedAccount =
              await tx.account.update({
                where: {
                  id: account.id,
                },

                data: {
                  balance: {
                    decrement:
                      billAmount,
                  },
                },
              });

            /*
              CREATE DATABASE TRANSACTION
            */
            const transaction =
              await tx.transaction.create({
                data: {
                  userId,

                  type: "debit",

                  amount:
                    billAmount,

                  description:
                    `${selectedBill} Payment - ${provider} - ${accountNumber}`,

                  status:
                    "completed",
                },
              });

            return {
              updatedAccount,
              transaction,
              newBalance,
            };
          }
        );

      /*
        SEND SUCCESS RESPONSE
      */
      res.json({
        message:
          "Bill payment successful.",

        newBalance:
          Number(
            result.updatedAccount.balance
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

        bill: {
          selectedBill,
          provider,
          accountNumber,
          amount:
            billAmount,
        },
      });

    } catch (error) {
      console.error(
        "Pay bill error:",
        error
      );

      res.status(400).json({
        message:
          error.message ||
          "Unable to process bill payment.",
      });
    }
  }
);

module.exports = router;