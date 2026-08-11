const express = require("express");

const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "SwiftWallet backend is running"
  });
});

app.listen(PORT, () => {
  console.log(`SwiftWallet backend running on http://localhost:${PORT}`);
});