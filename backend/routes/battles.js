const {requireToken} = require('../middleware/auth');

const express = require('express')
const router = express.Router()

const battlesCtrl = require('../controllers/battles')

// index
router.get("/", battlesCtrl.index);

// show
router.get("/:id", battlesCtrl.show);

// create
router.post("/", requireToken, battlesCtrl.create);

// update
router.put("/:id", requireToken, battlesCtrl.update);

// delete
router.delete("/:id", requireToken, battlesCtrl.delete);

module.exports = router

