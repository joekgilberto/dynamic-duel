const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth");
const {requireToken} = require('../middleware/auth');

router.post("/signup", authCtrl.signUp);

router.post("/login", authCtrl.login);

router.get("/logout", authCtrl.logout);

router.get("/:id", authCtrl.show);

router.put("/:id", requireToken, authCtrl.update);


module.exports = router;
