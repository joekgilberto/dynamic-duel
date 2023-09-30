const {requireToken} = require('../middleware/auth');

const express = require('express')
const router = express.Router()

const battlesCtrl = require('../controllers/battles')
const usersBattlesCtrl = require('../controllers/userBattles')
const otherUsersBattlesCtrl = require('../controllers/otherUsersBattles')

router.get("/", battlesCtrl.index);

router.get("/detail/:id", battlesCtrl.show);

router.get("/yours/:id", usersBattlesCtrl.index);

router.get("/others/:id", otherUsersBattlesCtrl.index);

router.post("/", requireToken, battlesCtrl.create);

router.put("/detail/:id", requireToken, battlesCtrl.update);

router.delete("/detail/:id", requireToken, battlesCtrl.delete);

module.exports = router

