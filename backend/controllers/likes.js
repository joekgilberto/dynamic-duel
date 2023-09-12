const { Likes } = require('../models')
const ObjectId = require('mongodb').ObjectId;

module.exports = {
  index,
  show,
  delete: destroy,
  update
}

async function index(req, res, next) {
    try {
      const allLikes = await Likes.find({})
      res.status(200).json(allLikes);
    } catch (error) {
      res.status(400).json(error);
    }
  };

async function show(req, res, next) {
  try {
    const id = new ObjectId(req.params.id)
    const foundLikes = await Likes.findById(req.params.id)
    res.status(200).json(foundLikes);
  } catch (error) {
    res.status(400).json(error);
  }
};

async function destroy(req, res, next) {
  try {
    const deletedLikes = await Likes.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedLikes);
  } catch (error) {
    res.status(400).json(error);
  }
};

async function update(req, res, next) {
  try {
    const updatedLikes = await Likes.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.status(200).json(updatedLikes)

  } catch (error) {
    res.status(400).json(error);
  }
};