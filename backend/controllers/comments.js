const { Comments } = require('../models')

module.exports = {
  index,
  show,
  delete: destroy,
  update
}

async function index(req, res, next) {
  try {
    const allComments = await Comments.find({})
    res.status(200).json(allComments);
  } catch (error) {
    res.status(400).json(error);
  }
};

async function show(req, res, next) {
  try {
    const foundComment = await Comments.findById(req.params.id)
    res.status(200).json(foundComment);
  } catch (error) {
    res.status(400).json(error);
  }
};

async function destroy(req, res, next) {
  try {
    const deletedComment = await Comments.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedComment);
  } catch (error) {
    res.status(400).json(error);
  }
};

async function update(req, res, next) {
  try {
    const updatedLikes = await Comments.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.status(200).json(updatedLikes)

  } catch (error) {
    res.status(400).json(error);
  }
};