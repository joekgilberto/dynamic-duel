const { Battles, User } = require('../models')

module.exports = {
    index
}

async function index(req, res, next) {
    try {
        const battleOwner = await User.find({username:req.params.id})
        const usersBattles = await Battles.find({owner: battleOwner[0]._id})
        res.status(200).json(usersBattles);
    } catch (error) {
        res.status(400).json(error);
    }
};