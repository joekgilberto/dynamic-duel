import * as commentsApi from './comments-api'

export async function getComments(id) {
    try {
        const foundComments = await commentsApi.show(id);
        return foundComments;
    } catch (err) {
        throw err;
    }
}

export async function deleteAllComments(id) {
    try {
        const deletedComment = await commentsApi.destroy(id);
        return deletedComment;
    } catch (err) {
        throw err;
    }
}

export async function addComment(commentData, newCommentData, user) {
    try {
        console.log(user)
        if (user) {
            const newComment = { owner: user._id, username: user.username, textContent: newCommentData }
            commentData.comments.push(newComment)
            const data = await commentsApi.update(commentData._id, commentData)
            return data
        }

    } catch (err) {
        return err
    }
}

export async function removeComment(comments, commentIdx, user) {
    try {
        if (comments.comments[commentIdx].owner === user._id) {
            comments.comments.splice(commentIdx, 1);
            const data = await commentsApi.update(comments._id, comments)
            return data
        }

    } catch (err) {
        return err
    }
}