const middleware = require('../middleware/auth');

const express = require('express')
const router = express.Router()

const battlesCtrl = require('../controllers/battles')

// index
router.get("/", battlesCtrl.index);

// show
router.get("/:id", battlesCtrl.show);

// create
router.post("/", middleware.requireToken, battlesCtrl.create);

// update
router.put("/:id", middleware.requireToken, battlesCtrl.update);

// delete
router.delete("/:id", middleware.requireToken, battlesCtrl.delete);

module.exports = router

