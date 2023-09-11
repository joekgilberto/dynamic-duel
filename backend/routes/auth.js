const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth");
const {requireToken} = require('../middleware/auth');

// SIGN UP
// POST /auth/register
router.post("/signup", authCtrl.signUp);

// SIGN IN
// POST /auth/login
router.post("/login", authCtrl.login);

router.get("/logout", authCtrl.logout);

router.put("/:id", requireToken, authCtrl.update);


module.exports = router;
