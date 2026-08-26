const express = require("express");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const prisma = require("../lib/prisma");

require("dotenv").config();

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


/*
  SEND VERIFICATION EMAIL
*/
const sendVerificationEmail = async (
  email,
  firstName,
  verificationCode
) => {
  await transporter.sendMail({
    from: `"Swift Wallet" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Your Swift Wallet verification code",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background-color:#0d0d0d; color: #ffffff;">
        <div style="text-align: center;">

          <div style="margin-bottom: 30px;">
            <div style="display: inline-flex; align-items: center; gap: 10px;">

              <div style="width: 40px; height: 40px; background-color: #22c55e; border-radius: 10px; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; color: #000000;">
                SW
              </div>

              <span style="font-size: 20px; font-weight: 700; color: #ffffff;">
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


/*
  SEND PASSWORD RESET EMAIL
*/
const sendPasswordResetEmail = async (
  email,
  firstName,
  resetToken
) => {
  const resetLink =
    `http://localhost:3000/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

  await transporter.sendMail({
    from: `"Swift Wallet" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Reset your Swift Wallet password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background-color:#0d0d0d; color:#ffffff;">
        <div style="text-align:center;">

          <div style="margin-bottom:30px;">
            <div style="display:inline-flex; align-items:center; gap:10px;">

              <div style="width:40px; height:40px; background-color:#22c55e; border-radius:10px; display:inline-flex; align-items:center; justify-content:center; font-weight:bold; color:#000000;">
                SW
              </div>

              <span style="font-size:20px; font-weight:700; color:#ffffff;">
                Swift Wallet
              </span>

            </div>
          </div>

          <h1 style="color:#22c55e;">
            Reset your password
          </h1>

          <p style="color:#cccccc; font-size:16px;">
            Hi ${firstName},
          </p>

          <p style="color:#cccccc; font-size:16px;">
            We received a request to reset your Swift Wallet password.
          </p>

          <p style="color:#cccccc; font-size:16px;">
            Click the button below to create a new password.
          </p>

          <div style="margin:30px 0;">
            <a
              href="${resetLink}"
              style="
                display:inline-block;
                padding:15px 30px;
                background-color:#22c55e;
                color:#000000;
                text-decoration:none;
                border-radius:10px;
                font-weight:700;
              "
            >
              Reset Password
            </a>
          </div>

          <p style="color:#888888; font-size:14px;">
            This link expires in 10 minutes.
          </p>

          <p style="color:#888888; font-size:14px;">
            If you did not request a password reset, you can safely ignore this email.
          </p>

        </div>
      </div>
    `,
  });
};

/*
  SIGN UP
*/
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

    const firstName =
      nameParts[0];

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
        Date.now() + 10 * 60 * 1000
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


/*
  VERIFY EMAIL
*/
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
          message:
            "User not found",
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
          email:
            updatedUser.email,
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


/*
  RESEND VERIFICATION CODE
*/
router.post(
  "/resend-code",
  async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          message:
            "Email is required",
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
          message:
            "User not found",
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
          Date.now() + 10 * 60 * 1000
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


/*
  COMPLETE PROFILE
*/
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
          message:
            "User not found",
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
          email:
            updatedUser.email,
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


/*
  IDENTITY VERIFICATION
*/
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
          message:
            "User not found",
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
              identityDocument || null,
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
          email:
            updatedUser.email,
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


/*
  CREATE PIN
*/
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
          message:
            "User not found",
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
          Math.random() * 9000000000
        ).toString();

      const cardNumber =
        "4829 " +
        Math.floor(
          1000 + Math.random() * 9000
        ) +
        " " +
        Math.floor(
          1000 + Math.random() * 9000
        ) +
        " " +
        Math.floor(
          1000 + Math.random() * 9000
        );

      const expiryDate =
        "12/" +
        (
          29 +
          Math.floor(
            Math.random() * 3
          )
        );

      const welcomeBalance =
        200350;

      const result =
        await prisma.$transaction(
          async (tx) => {

            const securitySettings =
              await tx.securitySettings.upsert({
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
              });

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
          email:
            user.email,
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


/*
  LOGIN
*/
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
                createdAt: "desc",
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

      /*
        CREATE JWT
      */
      const token =
        jwt.sign(
          {
            userId: user.id,
            email: user.email,
          },

          process.env.JWT_SECRET,

          {
            expiresIn: "7d",
          }
        );

      const card =
        user.cards?.[0] || null;

      res.json({
        message:
          "Login successful",

        token,

        user: {
          id: user.id,

          firstName:
            user.firstName,

          lastName:
            user.lastName,

          email:
            user.email,

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

          account:
            user.account
              ? {
                  id:
                    user.account.id,

                  accountNumber:
                    user.account
                      .accountNumber,

                  balance:
                    user.account.balance.toString(),
                }
              : null,

          card:
            card
              ? {
                  id: card.id,

                  cardNumber:
                    card.cardNumber,

                  expiryDate:
                    card.expiryDate,

                  frozen:
                    card.frozen,
                }
              : null,

          hasPin:
            !!user
              .securitySettings
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



/*
  FORGOT PASSWORD
*/
router.post(
  "/forgot-password",
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

/*
  RESET PASSWORD
*/
router.post(
  "/reset-password",
  async (req, res) => {
    try {
      const {
        email,
        token,
        newPassword,
      } = req.body;

      if (
        !email ||
        !token ||
        !newPassword
      ) {
        return res.status(400).json({
          message:
            "Email, reset token and new password are required.",
        });
      }

      /*
        Check password length.
      */
      if (newPassword.length < 8) {
        return res.status(400).json({
          message:
            "Password must be at least 8 characters long.",
        });
      }

      const normalizedEmail =
        email.toLowerCase().trim();

      /*
        Hash the token received from the reset link.
      */
      const resetTokenHash =
        crypto
          .createHash("sha256")
          .update(token)
          .digest("hex");

      /*
        Find the user using both email
        and reset token.
      */
      const user =
        await prisma.user.findFirst({
          where: {
            email: normalizedEmail,

            resetPasswordToken:
              resetTokenHash,
          },
        });

      if (!user) {
        return res.status(400).json({
          message:
            "Invalid or expired password reset link.",
        });
      }

      /*
        Check token expiry.
      */
      if (
        !user.resetPasswordExpires ||
        new Date() >
          user.resetPasswordExpires
      ) {
        return res.status(400).json({
          message:
            "This password reset link has expired.",
        });
      }

      /*
        Hash the new password.
      */
      const passwordHash =
        await bcrypt.hash(
          newPassword,
          10
        );

      /*
        Update password and invalidate
        the reset token.
      */
      await prisma.user.update({
        where: {
          id: user.id,
        },

        data: {
          passwordHash,

          resetPasswordToken: null,

          resetPasswordExpires: null,
        },
      });

      res.json({
        message:
          "Password reset successfully. You can now sign in with your new password.",
      });

    } catch (error) {
      console.error(
        "Reset password error:",
        error
      );

      res.status(500).json({
        message:
          "Something went wrong while resetting your password.",
      });
    }
  }
);

      /*
        Do not reveal whether an account exists.
      */
      if (!user) {
        return res.json({
          message:
            "If an account exists with that email, a password reset link has been sent.",
        });
      }

      /*
        Generate a secure random token.
      */
      const resetToken =
        crypto.randomBytes(32).toString("hex");

      /*
        Store a hash of the token in the database.
      */
      const resetTokenHash =
        crypto
          .createHash("sha256")
          .update(resetToken)
          .digest("hex");

      /*
        Token expires in 10 minutes.
      */
      const resetPasswordExpires =
        new Date(
          Date.now() + 10 * 60 * 1000
        );

      await prisma.user.update({
        where: {
          id: user.id,
        },

        data: {
          resetPasswordToken:
            resetTokenHash,

          resetPasswordExpires,
        },
      });

      try {
        await sendPasswordResetEmail(
          user.email,
          user.firstName,
          resetToken
        );
      } catch (emailError) {
        console.error(
          "Password reset email error:",
          emailError
        );

        /*
          Remove the reset token if email failed.
        */
        await prisma.user.update({
          where: {
            id: user.id,
          },

          data: {
            resetPasswordToken: null,
            resetPasswordExpires: null,
          },
        });

        return res.status(500).json({
          message:
            "Unable to send password reset email.",
        });
      }

      res.json({
        message:
          "If an account exists with that email, a password reset link has been sent.",
      });

    } catch (error) {
      console.error(
        "Forgot password error:",
        error
      );

      res.status(500).json({
        message:
          "Something went wrong while requesting a password reset.",
      });
    }
  }
);

/*
  VERIFY PIN
  PROTECTED BY JWT
*/
router.post(
  "/verify-pin",
  async (req, res) => {
    try {
      const {
        pin,
      } = req.body;

      /*
        CHECK PIN
      */
      if (!pin) {
        return res.status(400).json({
          message:
            "PIN is required",
        });
      }

      /*
        CHECK PIN FORMAT
      */
      if (!/^\d{4}$/.test(pin)) {
        return res.status(400).json({
          message:
            "PIN must be exactly 4 digits",
        });
      }

      /*
        GET JWT
      */
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
            "Access denied. No authentication token provided.",
        });
      }

      /*
        VERIFY JWT
      */
      let decoded;

      try {
        decoded =
          jwt.verify(
            token,
            process.env.JWT_SECRET
          );
      } catch (error) {
        return res.status(403).json({
          message:
            "Invalid or expired authentication token.",
        });
      }

      /*
        FIND USER USING JWT USER ID
      */
      const user =
        await prisma.user.findUnique({
          where: {
            id: decoded.userId,
          },

          include: {
            securitySettings: true,
          },
        });

      if (!user) {
        return res.status(404).json({
          message:
            "User not found.",
        });
      }

      /*
        CHECK FOR PIN
      */
      if (
        !user.securitySettings ||
        !user.securitySettings.pinHash
      ) {
        return res.status(400).json({
          message:
            "No transaction PIN has been created for this account.",
        });
      }

      /*
        COMPARE PIN WITH BCRYPT HASH
      */
      const pinMatches =
        await bcrypt.compare(
          pin,
          user.securitySettings.pinHash
        );

      if (!pinMatches) {
        return res.status(401).json({
          message:
            "Incorrect PIN.",
        });
      }

      /*
        PIN VERIFIED
      */
      res.json({
        message:
          "PIN verified successfully.",
      });

    } catch (error) {
      console.error(
        "PIN verification error:",
        error
      );

      res.status(500).json({
        message:
          "Something went wrong while verifying your PIN.",
      });
    }
  }
);


/*
  CHANGE TRANSACTION PIN
  PROTECTED BY JWT
*/
router.post(
  "/change-pin",
  async (req, res) => {
    try {
      const {
        currentPin,
        newPin,
      } = req.body;

      /*
        CHECK REQUIRED FIELDS
      */
      if (!currentPin || !newPin) {
        return res.status(400).json({
          message:
            "Current PIN and new PIN are required.",
        });
      }

      /*
        CHECK PIN FORMAT
      */
      if (!/^\d{4}$/.test(currentPin)) {
        return res.status(400).json({
          message:
            "Current PIN must be exactly 4 digits.",
        });
      }

      if (!/^\d{4}$/.test(newPin)) {
        return res.status(400).json({
          message:
            "New PIN must be exactly 4 digits.",
        });
      }

      /*
        MAKE SURE NEW PIN IS DIFFERENT
      */
      if (currentPin === newPin) {
        return res.status(400).json({
          message:
            "Your new PIN must be different from your current PIN.",
        });
      }

      /*
        GET JWT
      */
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
            "Access denied. No authentication token provided.",
        });
      }

      /*
        VERIFY JWT
      */
      let decoded;

      try {
        decoded =
          jwt.verify(
            token,
            process.env.JWT_SECRET
          );
      } catch (error) {
        return res.status(403).json({
          message:
            "Invalid or expired authentication token.",
        });
      }

      /*
        FIND USER USING JWT USER ID
      */
      const user =
        await prisma.user.findUnique({
          where: {
            id: decoded.userId,
          },

          include: {
            securitySettings: true,
          },
        });

      if (!user) {
        return res.status(404).json({
          message:
            "User not found.",
        });
      }

      /*
        CHECK THAT USER HAS A PIN
      */
      if (
        !user.securitySettings ||
        !user.securitySettings.pinHash
      ) {
        return res.status(400).json({
          message:
            "No transaction PIN has been created for this account.",
        });
      }

      /*
        VERIFY CURRENT PIN
      */
      const currentPinMatches =
        await bcrypt.compare(
          currentPin,
          user.securitySettings.pinHash
        );

      if (!currentPinMatches) {
        return res.status(401).json({
          message:
            "Current PIN is incorrect.",
        });
      }

      /*
        HASH NEW PIN
      */
      const newPinHash =
        await bcrypt.hash(
          newPin,
          10
        );

      /*
        UPDATE PIN
      */
      await prisma.securitySettings.update({
        where: {
          userId: user.id,
        },

        data: {
          pinHash: newPinHash,
        },
      });

      /*
        SUCCESS
      */
      res.json({
        message:
          "Transaction PIN changed successfully.",
      });

    } catch (error) {
      console.error(
        "Change PIN error:",
        error
      );

      res.status(500).json({
        message:
          "Something went wrong while changing your PIN.",
      });
    }
  }
);


/*
  GET CURRENT LOGGED-IN USER
  PROTECTED BY JWT
*/
router.get(
  "/me",
  async (req, res) => {
    try {
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

      let decoded;

      try {
        decoded =
          jwt.verify(
            token,
            process.env.JWT_SECRET
          );
      } catch (error) {
        return res.status(403).json({
          message:
            "Invalid or expired authentication token.",
        });
      }

      const user =
        await prisma.user.findUnique({
          where: {
            id: decoded.userId,
          },

          include: {
            account: true,

            cards: true,

            transactions: {
              orderBy: {
                createdAt: "desc",
              },

              take: 5,
            },

            securitySettings: true,
          },
        });

      if (!user) {
        return res.status(404).json({
          message:
            "User not found.",
        });
      }

      const card =
        user.cards?.[0] || null;

      res.json({
        user: {
          id:
            user.id,

          firstName:
            user.firstName,

          lastName:
            user.lastName,

          email:
            user.email,

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

          account:
            user.account
              ? {
                  id:
                    user.account.id,

                  accountNumber:
                    user.account.accountNumber,

                  balance:
                    user.account.balance.toString(),
                }
              : null,

          card:
            card
              ? {
                  id:
                    card.id,

                  cardNumber:
                    card.cardNumber,

                  expiryDate:
                    card.expiryDate,

                  frozen:
                    card.frozen,
                }
              : null,

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
        "Get current user error:",
        error
      );

      res.status(500).json({
        message:
          "Unable to retrieve account information.",
      });
    }
  }
);


module.exports = router;