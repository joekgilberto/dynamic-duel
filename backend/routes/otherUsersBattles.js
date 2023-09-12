const express = require('express')
const router = express.Router()

const otherUsersBattlesCtrl = require('../controllers/otherUsersBattles')

router.get("/:id", otherUsersBattlesCtrl.index);

module.exports = router
