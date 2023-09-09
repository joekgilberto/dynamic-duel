const { Likes } = require('../models')
const { handleValidateOwnership } = require("../middleware/auth");
const ObjectId = require('mongodb').ObjectId;

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

// BATTLE INDEX ACTION
async function index(req, res, next) {
    try {
      // get all battles
      const allLikes = await Likes.find({})
      res.status(200).json(allLikes);
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  };

// BATTLE SHOW ACTION
async function show(req, res, next) {
  try {
    const id = new ObjectId(req.params.id)
    const foundLikes = await Likes.findById(req.params.id)
    // send one battle
    res.status(200).json(foundLikes);
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
};

// BATTLE DESTROY ACTION 
async function destroy(req, res, next) {
  try {
    // send one battle
    const deletedLikes = await Likes.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedLikes);
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
};

// BATTLE UPDATE ACTION
async function update(req, res, next) {
  try {
    const updatedLikes = await Likes.findByIdAndUpdate(
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