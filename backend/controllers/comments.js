const { Comments } = require('../models')
const { handleValidateOwnership } = require("../middleware/auth");

// EXPORT Controller Action
module.exports = {
  index,
  show,
  delete: destroy,
  update
}

///////////////////////////////
// CONTROLLERS
////////////////////////////////

// Comment INDEX ACTION
async function index(req, res, next) {
  try {
    // get all Comments
    const allComments = await Comments.find({})

    res.status(200).json(allComments);
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
};

// Comment SHOW ACTION
async function show(req, res, next) {
  try {
    const foundComment = await Comments.findById(req.params.id)
    // send one Comment
    res.status(200).json(foundComment);
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
};

// Comment DESTROY ACTION 
async function destroy(req, res, next) {
  try {
    // send one Comment
    const deletedComment = await Comments.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedComment);
  } catch (error) {
    //send error
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
    //send error
    res.status(400).json(error);
  }
};