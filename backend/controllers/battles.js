const { Battles } = require('../models')
const { Likes } = require('../models')
const { handleValidateOwnership } = require("../middleware/auth");

// EXPORT Controller Action
module.exports = {
  index,
  create,
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
    const allBattles = await Battles.find({}).populate('owner', 'username -_id')

    res.status(200).json(allBattles);
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
};

// BATTLE CREATE ACTION
async function create(req, res, next) {
  try {
    // create new battle
    const owner = req.user._id
    req.body.owner = owner

    const createdLikes = await Likes.create({likes:[]})

    req.body.likes = createdLikes._id
        
    const newBattle = await Battles.create(req.body)
    res.status(201).json(newBattle);
  } catch (error) {
    //send error
    console.log(error)
    res.status(400).json(error);
  }
};

// BATTLE SHOW ACTION
async function show(req, res, next) {
  try {
    const foundBattle = await Battles.findById(req.params.id)
      .populate("owner")
      .exec();
    // send one battle
    res.status(200).json(foundBattle);
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
};

// BATTLE DESTROY ACTION 
async function destroy(req, res, next) {
  try {
    handleValidateOwnership(req, await Battles.findById(req.params.id))
    // send one battle
    const deletedBattle = await Battles.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedBattle);
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
};

// BATTLE UPDATE ACTION
async function update(req, res, next) {
  try {
    handleValidateOwnership(req, await Battles.findById(req.params.id))

    const updatedBattle = await Battles.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.status(200).json(updatedBattle)

  } catch (error) {
    //send error
    res.status(400).json(error);
  }
};