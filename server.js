const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

/* ===== MIDDLEWARE ===== */
app.use(cors({
  origin: "*",   
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

/* ===== CONFIG ===== */
const SECRET = process.env.JWT_SECRET || "rahasia";

/* ===== DUMMY USER ===== */
const user = {
  username: "JanjiNikah",
  password: "2029"
};

/* ===== ROOT ROUTE===== */
app.get("/", (req, res) => {
  res.send("Server Aktif 🚀");
});

/* ===== LOGIN ROUTE ===== */
app.post("/login", (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Data kosong" });
    }

    if (username === user.username && password === user.password) {
      const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });

      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Username/Password salah" });
    }

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ success: false });
  }
});

/* ===== PORT ===== */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server jalan di port ${PORT}`);
});

