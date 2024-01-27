const { Battles, Likes, Comments } = require('../models')
const { handleValidateOwnership } = require("../middleware/auth");

module.exports = {
  index,
  create,
  show,
  delete: destroy,
  update
}

async function index(req, res, next) {
  try {
    const allBattles = await Battles.find({}).populate('owner', 'username -_id')

    res.status(200).json(allBattles);
  } catch (error) {
    res.status(400).json(error);
  }
};

async function create(req, res, next) {
  try {
    const owner = req.user._id
    req.body.owner = owner

    const createdLikes = await Likes.create({ likes: [] })
    const createdComments = await Comments.create({ comments: [] })

    req.body.likes = createdLikes._id
    req.body.comments = createdComments._id

    const newBattle = await Battles.create(req.body)
    res.status(201).json(newBattle);

  } catch (error) {
    console.log(error)
    res.status(400).json(error);
  }
};

async function show(req, res, next) {
  try {
    const foundBattle = await Battles.findById(req.params.id)
      .populate("owner")
      .exec();

    res.status(200).json(foundBattle);
  } catch (error) {
    res.status(400).json(error);
  }
};

async function destroy(req, res, next) {
  try {
    handleValidateOwnership(req, await Battles.findById(req.params.id))

    const deletedBattle = await Battles.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedBattle);
  } catch (error) {
    res.status(400).json(error);
  }
};

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
    res.status(400).json(error);
  }
};

