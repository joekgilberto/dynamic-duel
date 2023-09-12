const { Battles } = require('../models')

module.exports = {
    index
}

async function index(req, res, next) {
    try {
        const usersBattles = await Battles.find({owner: req.params.id})
        res.status(200).json(usersBattles);
    } catch (error) {
        res.status(400).json(error);
    }
};