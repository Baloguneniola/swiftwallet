const express = require("express");
const bcrypt = require("bcrypt");
const { Resend } = require("resend");
const prisma = require("../lib/prisma");

const router = express.Router();

const resend = new Resend(
  process.env.RESEND_API_KEY
);

const sendVerificationEmail = async (
  email,
  firstName,
  verificationCode
) => {
  await resend.emails.send({
    from:
      process.env.RESEND_FROM_EMAIL ||
      "onboarding@resend.dev",
    to: [email],
    subject:
      "Your Swift Wallet verification code",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background-color: #0d0d0d; color: #ffffff;">
        <div style="text-align: center;">

          <div style="margin-bottom: 30px;">
            <div style="display: inline-flex; align-items: center; gap: 10px;">

              <div style="width: 40px; height: 40px; background-color: #22c55e; border-radius: 10px; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; color: #000000;">
                SW
              </div>

              <span style="font-size: 20px; font-weight: 700;">
                Swift Wallet
              </span>

            </div>
          </div>

          <h1 style="color: #22c55e;">
            Verify your email
          </h1>

          <p style="color: #cccccc; font-size: 16px;">
            Hi ${firstName},
          </p>

          <p style="color: #cccccc; font-size: 16px;">
            Use the verification code below to verify your Swift Wallet account.
          </p>

          <div style="margin: 30px 0; padding: 20px; background-color: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 10px;">
            <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #22c55e;">
              ${verificationCode}
            </div>
          </div>

          <p style="color: #888888; font-size: 14px;">
            This code expires in 10 minutes.
          </p>

          <p style="color: #888888; font-size: 14px;">
            If you did not create a Swift Wallet account, you can safely ignore this email.
          </p>

        </div>
      </div>
    `,
  });
};

router.post("/signup", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message:
          "Name, email and password are required",
      });
    }

    const normalizedEmail =
      email.toLowerCase().trim();

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email: normalizedEmail,
        },
      });

    if (existingUser) {
      return res.status(409).json({
        message:
          "An account with this email already exists",
      });
    }

    const nameParts =
      name.trim().split(/\s+/);

    const firstName = nameParts[0];

    const lastName =
      nameParts.length > 1
        ? nameParts.slice(1).join(" ")
        : "";

    const passwordHash =
      await bcrypt.hash(password, 10);

    const verificationCode =
      Math.floor(
        100000 +
          Math.random() * 900000
      ).toString();

    const verificationExpires =
      new Date(
        Date.now() +
          10 * 60 * 1000
      );

    const user =
      await prisma.user.create({
        data: {
          firstName,
          lastName,
          email: normalizedEmail,
          passwordHash,
          emailVerified: false,
          verificationCode,
          verificationExpires,
        },
      });

    try {
      await sendVerificationEmail(
        normalizedEmail,
        firstName,
        verificationCode
      );
    } catch (emailError) {
      console.error(
        "Verification email error:",
        emailError
      );

      await prisma.user.delete({
        where: {
          id: user.id,
        },
      });

      return res.status(500).json({
        message:
          "Account could not be created because the verification email could not be sent",
      });
    }

    res.status(201).json({
      message:
        "Account created successfully",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(
      "Signup error:",
      error
    );

    res.status(500).json({
      message:
        "Something went wrong while creating the account",
    });
  }
});

router.post(
  "/verify-email",
  async (req, res) => {
    try {
      const {
        email,
        code,
      } = req.body;

      if (!email || !code) {
        return res.status(400).json({
          message:
            "Email and verification code are required",
        });
      }

      const normalizedEmail =
        email.toLowerCase().trim();

      const user =
        await prisma.user.findUnique({
          where: {
            email: normalizedEmail,
          },
        });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      if (user.emailVerified) {
        return res.status(400).json({
          message:
            "Email is already verified",
        });
      }

      if (
        !user.verificationCode ||
        !user.verificationExpires
      ) {
        return res.status(400).json({
          message:
            "No verification code is available",
        });
      }

      if (
        new Date() >
        user.verificationExpires
      ) {
        return res.status(400).json({
          message:
            "Verification code has expired",
        });
      }

      if (
        user.verificationCode !==
        code.toString()
      ) {
        return res.status(400).json({
          message:
            "Invalid verification code",
        });
      }

      const updatedUser =
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            emailVerified: true,
            verificationCode: null,
            verificationExpires: null,
          },
        });

      res.json({
        message:
          "Email verified successfully",
        user: {
          id: updatedUser.id,
          firstName:
            updatedUser.firstName,
          lastName:
            updatedUser.lastName,
          email: updatedUser.email,
        },
      });
    } catch (error) {
      console.error(
        "Email verification error:",
        error
      );

      res.status(500).json({
        message:
          "Something went wrong while verifying your email",
      });
    }
  }
);

router.post(
  "/resend-code",
  async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          message: "Email is required",
        });
      }

      const normalizedEmail =
        email.toLowerCase().trim();

      const user =
        await prisma.user.findUnique({
          where: {
            email: normalizedEmail,
          },
        });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      if (user.emailVerified) {
        return res.status(400).json({
          message:
            "Email is already verified",
        });
      }

      const verificationCode =
        Math.floor(
          100000 +
            Math.random() * 900000
        ).toString();

      const verificationExpires =
        new Date(
          Date.now() +
            10 * 60 * 1000
        );

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          verificationCode,
          verificationExpires,
        },
      });

      try {
        await sendVerificationEmail(
          user.email,
          user.firstName,
          verificationCode
        );
      } catch (emailError) {
        console.error(
          "Resend verification email error:",
          emailError
        );

        return res.status(500).json({
          message:
            "Unable to send a new verification code",
        });
      }

      res.json({
        message:
          "A new verification code has been sent to your email",
      });
    } catch (error) {
      console.error(
        "Resend code error:",
        error
      );

      res.status(500).json({
        message:
          "Something went wrong while resending the verification code",
      });
    }
  }
);

router.post(
  "/complete-profile",
  async (req, res) => {
    try {
      const {
        email,
        phoneNumber,
        dateOfBirth,
        residentialAddress,
        country,
        stateProvince,
      } = req.body;

      if (
        !email ||
        !phoneNumber ||
        !dateOfBirth ||
        !residentialAddress ||
        !country ||
        !stateProvince
      ) {
        return res.status(400).json({
          message:
            "All profile fields are required",
        });
      }

      const normalizedEmail =
        email.toLowerCase().trim();

      const user =
        await prisma.user.findUnique({
          where: {
            email: normalizedEmail,
          },
        });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      if (!user.emailVerified) {
        return res.status(400).json({
          message:
            "Please verify your email before completing your profile",
        });
      }

      const parsedDateOfBirth =
        new Date(dateOfBirth);

      if (
        isNaN(
          parsedDateOfBirth.getTime()
        )
      ) {
        return res.status(400).json({
          message:
            "Invalid date of birth",
        });
      }

      const updatedUser =
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            phoneNumber:
              phoneNumber.trim(),
            dateOfBirth:
              parsedDateOfBirth,
            residentialAddress:
              residentialAddress.trim(),
            country:
              country.trim(),
            stateProvince:
              stateProvince.trim(),
          },
        });

      res.json({
        message:
          "Profile completed successfully",
        user: {
          id: updatedUser.id,
          firstName:
            updatedUser.firstName,
          lastName:
            updatedUser.lastName,
          email: updatedUser.email,
        },
      });
    } catch (error) {
      console.error(
        "Complete profile error:",
        error
      );

      res.status(500).json({
        message:
          "Something went wrong while saving your profile",
      });
    }
  }
);

router.post(
  "/identity-verification",
  async (req, res) => {
    try {
      const {
        email,
        nationality,
        identityType,
        identityNumber,
        identityDocument,
      } = req.body;

      if (
        !email ||
        !nationality ||
        !identityType ||
        !identityNumber
      ) {
        return res.status(400).json({
          message:
            "Nationality, identity type and identity number are required",
        });
      }

      const normalizedEmail =
        email.toLowerCase().trim();

      const user =
        await prisma.user.findUnique({
          where: {
            email: normalizedEmail,
          },
        });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      if (!user.emailVerified) {
        return res.status(400).json({
          message:
            "Please verify your email before completing identity verification",
        });
      }

      if (
        !user.phoneNumber ||
        !user.dateOfBirth ||
        !user.residentialAddress ||
        !user.country ||
        !user.stateProvince
      ) {
        return res.status(400).json({
          message:
            "Please complete your profile before identity verification",
        });
      }

      const updatedUser =
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            nationality:
              nationality.trim(),
            identityType:
              identityType.trim(),
            identityNumber:
              identityNumber.trim(),
            identityDocument:
              identityDocument ||
              null,
          },
        });

      res.json({
        message:
          "Identity verification information saved successfully",
        user: {
          id: updatedUser.id,
          firstName:
            updatedUser.firstName,
          lastName:
            updatedUser.lastName,
          email: updatedUser.email,
        },
      });
    } catch (error) {
      console.error(
        "Identity verification error:",
        error
      );

      res.status(500).json({
        message:
          "Something went wrong while saving your identity information",
      });
    }
  }
);

router.post(
  "/create-pin",
  async (req, res) => {
    try {
      const {
        email,
        pin,
      } = req.body;

      if (!email || !pin) {
        return res.status(400).json({
          message:
            "Email and PIN are required",
        });
      }

      if (!/^\d{4}$/.test(pin)) {
        return res.status(400).json({
          message:
            "PIN must be exactly 4 digits",
        });
      }

      const normalizedEmail =
        email.toLowerCase().trim();

      const user =
        await prisma.user.findUnique({
          where: {
            email: normalizedEmail,
          },
          include: {
            account: true,
            cards: true,
            securitySettings: true,
          },
        });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      if (!user.emailVerified) {
        return res.status(400).json({
          message:
            "Please verify your email before creating your PIN",
        });
      }

      if (
        !user.phoneNumber ||
        !user.dateOfBirth ||
        !user.residentialAddress ||
        !user.country ||
        !user.stateProvince
      ) {
        return res.status(400).json({
          message:
            "Please complete your profile first",
        });
      }

      if (
        !user.nationality ||
        !user.identityType ||
        !user.identityNumber
      ) {
        return res.status(400).json({
          message:
            "Please complete identity verification first",
        });
      }

      if (
        user.securitySettings?.pinHash
      ) {
        return res.status(400).json({
          message:
            "A PIN has already been created for this account",
        });
      }

      if (user.account) {
        return res.status(400).json({
          message:
            "An account has already been created for this user",
        });
      }

      const pinHash =
        await bcrypt.hash(pin, 10);

      const accountNumber =
        Math.floor(
          1000000000 +
            Math.random() *
              9000000000
        ).toString();

      const cardNumber =
        "4829 " +
        Math.floor(
          1000 +
            Math.random() * 9000
        ) +
        " " +
        Math.floor(
          1000 +
            Math.random() * 9000
        ) +
        " " +
        Math.floor(
          1000 +
            Math.random() * 9000
        );

      const expiryDate =
        "12/" +
        (29 +
          Math.floor(
            Math.random() * 3
          ));

      const welcomeBalance = 200350;

      const result =
        await prisma.$transaction(
          async (tx) => {
            const securitySettings =
              await tx.securitySettings.upsert(
                {
                  where: {
                    userId: user.id,
                  },
                  update: {
                    pinHash,
                  },
                  create: {
                    userId: user.id,
                    pinHash,
                  },
                }
              );

            const account =
              await tx.account.create({
                data: {
                  userId: user.id,
                  accountNumber,
                  balance:
                    welcomeBalance,
                },
              });

            const card =
              await tx.card.create({
                data: {
                  userId: user.id,
                  cardNumber,
                  expiryDate,
                  frozen: false,
                },
              });

            const transaction =
              await tx.transaction.create({
                data: {
                  userId: user.id,
                  type: "credit",
                  amount:
                    welcomeBalance,
                  description:
                    "Welcome Bonus",
                  status:
                    "completed",
                },
              });

            return {
              securitySettings,
              account,
              card,
              transaction,
            };
          }
        );

      res.status(201).json({
        message:
          "Your Swift Wallet account has been created successfully",

        user: {
          id: user.id,
          firstName:
            user.firstName,
          lastName:
            user.lastName,
          email: user.email,
        },

        account: {
          accountNumber:
            result.account
              .accountNumber,
          balance:
            result.account.balance.toString(),
        },

        card: {
          cardNumber:
            result.card.cardNumber,
          expiryDate:
            result.card.expiryDate,
          frozen:
            result.card.frozen,
        },
      });
    } catch (error) {
      console.error(
        "Create PIN error:",
        error
      );

      if (
        error.code === "P2002"
      ) {
        return res.status(409).json({
          message:
            "An account or card already exists for this user. Please try logging in.",
        });
      }

      res.status(500).json({
        message:
          "Something went wrong while finishing your account setup",
      });
    }
  }
);

router.post(
  "/login",
  async (req, res) => {
    try {
      const {
        email,
        password,
      } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message:
            "Email and password are required",
        });
      }

      const normalizedEmail =
        email.toLowerCase().trim();

      const user =
        await prisma.user.findUnique({
          where: {
            email: normalizedEmail,
          },
          include: {
            account: true,
            cards: true,
            transactions: {
              orderBy: {
                createdAt:
                  "desc",
              },
            },
            securitySettings: true,
          },
        });

      if (!user) {
        return res.status(401).json({
          message:
            "Invalid email or password",
        });
      }

      const passwordMatches =
        await bcrypt.compare(
          password,
          user.passwordHash
        );

      if (!passwordMatches) {
        return res.status(401).json({
          message:
            "Invalid email or password",
        });
      }

      if (!user.emailVerified) {
        return res.status(403).json({
          message:
            "Please verify your email before signing in",
        });
      }

      const card =
        user.cards?.[0] || null;

      res.json({
        message:
          "Login successful",

        user: {
          id: user.id,
          firstName:
            user.firstName,
          lastName:
            user.lastName,
          email: user.email,

          emailVerified:
            user.emailVerified,

          phoneNumber:
            user.phoneNumber,

          dateOfBirth:
            user.dateOfBirth,

          residentialAddress:
            user.residentialAddress,

          country:
            user.country,

          stateProvince:
            user.stateProvince,

          nationality:
            user.nationality,

          identityType:
            user.identityType,

          identityNumber:
            user.identityNumber,

          identityDocument:
            user.identityDocument,

          accountNumber:
            user.account
              ?.accountNumber ||
            null,

          balance:
            user.account
              ? Number(
                  user.account.balance
                )
              : 0,

          cardNumber:
            card?.cardNumber ||
            null,

          expiryDate:
            card?.expiryDate ||
            null,

          cardFrozen:
            card?.frozen ||
            false,

          hasPin:
            !!user.securitySettings
              ?.pinHash,

          transactions:
            user.transactions.map(
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
        },
      });
    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      res.status(500).json({
        message:
          "Something went wrong while signing you in",
      });
    }
  }
);

module.exports = router;