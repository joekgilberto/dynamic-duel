const express = require('express')
const router = express.Router()

const battlesCtrl = require('../controllers/battles')

// index
router.get("/", battlesCtrl.index);

// show
router.get("/:id", battlesCtrl.show);

// create
router.post("/", battlesCtrl.create);

// update
router.put("/:id", battlesCtrl.update);

// delete
router.delete("/:id", battlesCtrl.delete);

module.exports = router

