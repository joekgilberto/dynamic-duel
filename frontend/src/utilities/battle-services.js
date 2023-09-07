import * as battleApi from './battle-api'

export async function getBattles(){
    try {
        const data = await battleApi.index()
        return data
    }catch(err){
        return err
    }
}

export async function createBattle(newBattleData){
    try {
        console.log(newBattleData)
        const data = await battleApi.create(newBattleData)
        // the promise from res.json()
        return data
    }catch(err){
        return err
    }
}