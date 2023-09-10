const express = require('express')
const router = express.Router()

const usersBattlesCtrl = require('../controllers/userBattles')

// index
router.get("/:id", usersBattlesCtrl.index);

module.exports = router
