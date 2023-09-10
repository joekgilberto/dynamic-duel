const {requireToken} = require('../middleware/auth');

const express = require('express')
const router = express.Router()

const commentsCtrl = require('../controllers/comments')

// index
router.get("/", commentsCtrl.index);

// show
router.get("/:id", commentsCtrl.show);

// create
router.post("/", requireToken, commentsCtrl.create);

// delete
router.delete("/:id", requireToken, commentsCtrl.delete);

module.exports = router

