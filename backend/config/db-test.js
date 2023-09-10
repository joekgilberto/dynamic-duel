require('../dotenv').config()
require('./database')

const Battles = require('../models/Battles')

async function clearLikes(){
    try {
        const updatedBattles = await Battles.updateMany({}, {likes: []})
        console.log(updatedBattles)
    }catch(err){
        console.log(err)
    }finally{
        process.exit()
    }
}

clearLikes()