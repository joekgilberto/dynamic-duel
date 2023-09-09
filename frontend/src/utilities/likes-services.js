import * as likesApi from './likes-api'

export async function getLikes(id) {
    try {
        console.log(id)
        const foundLikes = await likesApi.show(id);
        console.log(foundLikes)
        return foundLikes;
    } catch (err) {
        throw err;
    }
}

export async function deleteLikes(id) {
    try {
        const deletedLikes = await likesApi.destroy(id);
        return deletedLikes;
    } catch (err) {
        throw err;
    }
}

export async function addLike(likesId, likesData, userId) {
    try {
        likesData.likes.push(userId)
        const data = await likesApi.update(likesId, likesData)
        return data
    } catch (err) {
        return err
    }
}

export async function removeLike(likesId, likesData, userId) {
    try {
        const foundLike = likesData.likes.indexOf(userId);

        if (foundLike > -1) {
            likesData.likes.splice(foundLike, 1);
        }

        const data = await likesApi.update(likesId, likesData)
        return data
    } catch (err) {
        return err
    }
}
