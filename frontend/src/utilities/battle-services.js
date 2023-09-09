import * as battleApi from './battle-api'
import { deleteLikes } from './likes-services'

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

export async function deleteBattle(battleId, likesId) {
    try {
        const deletedBattle = await battleApi.destroy(battleId);
        return deletedBattle;
    } catch (err) {
        throw err;
    }
}
