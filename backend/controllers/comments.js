const { Comments } = require('../models')
const { handleValidateOwnership } = require("../middleware/auth");

// EXPORT Controller Action
module.exports = {
  index,
  create,
  show,
  delete: destroy
}

///////////////////////////////
// CONTROLLERS
////////////////////////////////

// Comment INDEX ACTION
async function index(req, res, next) {
  try {
    // get all Comments
    const allComments = await Comments.find({}).populate('owner', 'username -_id')

    res.status(200).json(allComments);
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
};

// Comment CREATE ACTION
async function create(req, res, next) {
  try {
    // create new Comment
    const newComment = await Comments.create(req.body)
    res.status(201).json(newComment);
  } catch (error) {
    //send error
    console.log(error)
    res.status(400).json(error);
  }
};

// Comment SHOW ACTION
async function show(req, res, next) {
  try {
    const foundComment = await Comments.findById(req.params.id)
      .populate("owner")
      .exec();
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
    handleValidateOwnership(req, await Comments.findById(req.params.id))
    // send one Comment
    const deletedComment = await Comments.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedComment);
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
};