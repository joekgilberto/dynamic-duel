const {requireToken} = require('../middleware/auth');

const express = require('express')
const router = express.Router()

const battlesCtrl = require('../controllers/battles')

router.get("/", battlesCtrl.index);

router.get("/:id", battlesCtrl.show);

router.post("/", requireToken, battlesCtrl.create);

router.put("/:id", requireToken, battlesCtrl.update);

router.delete("/:id", requireToken, battlesCtrl.delete);

module.exports = router

