const {requireToken} = require('../middleware/auth');

const express = require('express')
const router = express.Router()

const likesCtrl = require('../controllers/likes')

router.get("/", likesCtrl.index);

router.get("/:id", likesCtrl.show);

router.put("/:id", requireToken, likesCtrl.update);

router.delete("/:id", requireToken, likesCtrl.delete);

module.exports = router
