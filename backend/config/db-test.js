require('../node_modules/dotenv').config()
require('./database')

const { Battles, User } = require('../models')

async function clearLikes(){
    try {
        const updatedBattles = await Battles.updateMany({}, {likes: []})
    }catch(err){
        console.log(err)
    }finally{
        process.exit()
    }
}

async function addFavoritesArr(){
    try {
        const updatedBattles = await User.updateMany({}, {favorites: []})
    }catch(err){
        console.log(err)
    }finally{
        process.exit()
    }
}

// addFavoritesArr()