import * as authApi from "./auth-api"

export async function signUp(data) {
    try {
        const apiRegResponse = await authApi.signUpUser(data)
        return apiRegResponse
    } catch (err) {
        throw err
    }
}


export async function login(data) {
    try {
        const apiLoginResponse = await authApi.loginUser(data)
        return apiLoginResponse
    } catch (err) {
        throw err
    }
}

export async function getUser(username) {
    try {
        const apiUserResponse = await authApi.show(username)
        return apiUserResponse
    } catch (err) {
        throw err
    }
}

export async function addFavorite(user, newFav){
    try {
        if (user && user.favorites.length < 3) {
            user.favorites.push(newFav)
            const data = await authApi.update(user._id, user)
            return data
        }

    } catch (err) {
        return err
    }
}

export async function removeFavorite(user, removeFav){
    try {
        if (user) {
            const foundFav =  user.favorites.findIndex((el)=>{return el===removeFav})

            if (foundFav > -1){
                user.favorites.splice(foundFav, 1);
                const data = await authApi.update(user._id, user)
                return data
            }
        }

    } catch (err) {
        return err
    }
}