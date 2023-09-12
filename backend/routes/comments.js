const {requireToken} = require('../middleware/auth');

const express = require('express')
const router = express.Router()

const commentsCtrl = require('../controllers/comments')

router.get("/", commentsCtrl.index);

router.get("/:id", commentsCtrl.show);

router.delete("/:id", requireToken, commentsCtrl.delete);

router.put("/:id", requireToken, commentsCtrl.update);

module.exports = router

