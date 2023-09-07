import * as battleApi from './battle-api'

export async function createBattle(newBattleData){
    try {
        const data = await battleApi.create(newBattleData)
        // the promise from res.json()
        return data
    }catch(err){
        return err
    }
}