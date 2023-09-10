import * as battleApi from './battle-api'
import { createComment } from './comments-services'

export async function getAllBattles() {
    try {
        const data = await battleApi.index()
        return data
    } catch (err) {
        return err
    }
}

export async function getBattle(id) {
    try {
        const foundBattle = await battleApi.show(id);
        return foundBattle;
    } catch (err) {
        throw err;
    }
}

export async function createBattle(newBattleData) {
    try {
        const data = await battleApi.create(newBattleData)
        // the promise from res.json()
        return data
    } catch (err) {
        return err
    }
}

export async function editBattle(id, editedBattleData) {
    try {
        const data = await battleApi.update(id, editedBattleData)
        // the promise from res.json()
        return data
    } catch (err) {
        return err
    }
}

export async function addBattleComment(battle,commentData, user) {
    try {
        let data;
        const id = battle._id
        await createComment(commentData, user).then(async (comment)=>{
            const battleData = battle
            battleData.comments.push(comment)
            data = await battleApi.update(id, battleData)

        })
        
        return data
    } catch (err) {
        return err
    }
}

export async function deleteBattleComment(battle,commentId) {
    try {
        const foundComment = battle.comments.indexOf(commentId);

        if (foundComment > -1) {
            battle.comments.splice(foundComment, 1);
        }

        const data = await battleApi.update(battle._id, battle)
        return data
    } catch (err) {
        return err
    }
}


export async function deleteBattle(battleId) {
    try {
        const deletedBattle = await battleApi.destroy(battleId);
        return deletedBattle;
    } catch (err) {
        throw err;
    }
}
