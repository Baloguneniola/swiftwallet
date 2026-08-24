require("dotenv").config();

const express = require("express");
const cors = require("cors");
const prisma = require("./lib/prisma");
const authRoutes = require("./routes/auth");
const transferRoutes = require("./routes/transfers");
const addMoneyRoutes = require("./routes/addMoney");
const payBillsRoutes = require("./routes/payBills");

const app = express();
const PORT = 5000;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "SwiftWallet backend is running",
  });
});

app.get("/api/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    console.error(
      "Database connection failed:",
      error
    );

    res.status(500).json({
      status: "error",
      database: "disconnected",
    });
  }
});

app.use("/api/auth", authRoutes);

app.use("/api/transfers", transferRoutes);

app.use("/api/add-money", addMoneyRoutes );

app.use("/api/pay-bills", payBillsRoutes);

app.listen(PORT, () => {
  console.log(
    `SwiftWallet backend running on http://localhost:${PORT}`
  );
});