import * as commentsApi from './comments-api'

export async function getAllComments(arr) {
    try {
        const foundComments = []
        for (let comment of arr){
            let foundComment = await commentsApi.show(comment);
            foundComments.push(foundComment)
        }
        return foundComments;
    } catch (err) {
        throw err;
    }
}

export async function createComment(comment, user) {
    try {
        const newCommentData = {}
        newCommentData.description = comment
        newCommentData.username = user.username
        newCommentData.owner = user._id

        const data = await commentsApi.create(newCommentData)
        // the promise from res.json()
        return data._id
    } catch (err) {
        return err
    }
}

export async function deleteComment(id) {
    try {
        const deletedComment = await commentsApi.destroy(id);
        return deletedComment;
    } catch (err) {
        throw err;
    }
}

export async function deleteAllComments(arr) {
    try {
        const deletedComments = []
        for (let comment of arr){
            const deletedComment = await commentsApi.destroy(comment);
            deletedComments.push(deletedComment)
        }
        return deletedComments;
    } catch (err) {
        throw err;
    }
}