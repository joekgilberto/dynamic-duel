const express = require('express')
const router = express.Router()

const usersBattlesCtrl = require('../controllers/userBattles')

router.get("/:id", usersBattlesCtrl.index);

module.exports = router
