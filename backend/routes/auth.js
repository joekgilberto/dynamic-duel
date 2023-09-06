const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth");

// SIGN UP
// POST /auth/register
router.post("/register", authCtrl.register);

// SIGN IN
// POST /auth/login
router.post("/login", async (req, res, next) => {});

module.exports = router;
