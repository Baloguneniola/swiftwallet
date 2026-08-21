const bcrypt = require("bcryptjs");
const prisma = require("./lib/prisma");

async function resetAllPins() {
  try {
    console.log("Starting PIN reset...");

    const pin = "1234";

    // Create the bcrypt hash for 1234
    const pinHash = await bcrypt.hash(pin, 10);

    // Get every user
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
      },
    });

    console.log(`Found ${users.length} users.`);

    // Set PIN for every user
    for (const user of users) {
      await prisma.securitySettings.upsert({
        where: {
          userId: user.id,
        },

        update: {
          pinHash: pinHash,
        },

        create: {
          userId: user.id,
          pinHash: pinHash,
        },
      });

      console.log(
        `PIN set to 1234 for: ${user.email}`
      );
    }

    console.log("");
    console.log("================================");
    console.log("ALL PINS HAVE BEEN RESET");
    console.log("PIN: 1234");
    console.log(`Users updated: ${users.length}`);
    console.log("================================");
    console.log("");

  } catch (error) {
    console.error(
      "PIN RESET FAILED:",
      error
    );
  } finally {
    await prisma.$disconnect();
  }
}

resetAllPins();