import "./ShowBattle.css"

import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router'
import { Link } from "react-router-dom"
import { getBattle } from "../../utilities/battle-services"
import { addLike, getLikes, removeLike } from "../../utilities/likes-services"
import { getComments, addComment, removeComment } from "../../utilities/comments-services"
import { UserContext } from "../../data"

import Loading from "../../components/Loading/Loading"
import BattleChampion from "../../components/BattleChampion/BattleChampion"

export default function ShowBattle({ setUpdatedSearch }) {

    const navigate = useNavigate()
    const { id } = useParams()

    const [battle, setBattle] = useState(null)
    const [likes, setLikes] = useState(null)
    const [comments, setComments] = useState(null)
    const [newCommentData, setNewCommentData] = useState('')
    const [likeSource, setLikeSource] = useState(require('../../assets/like.png'))

    let isOwner;

    const { user } = useContext(UserContext);

    if (user) {
        isOwner = battle?.owner?._id === user._id;
    } else {
        isOwner = false;
    }

    async function handleLike(e) {
        if (user) {
            if (likes.likes.includes(user._id)) {
                setLikeSource(require('../../assets/like.png'))
                removeLike(likes._id, likes, user._id)
            } else {
                setLikeSource(require('../../assets/liked.png'))
                addLike(likes._id, likes, user._id)
            }
        } else {
            navigate("/auth")
        }
    }

    async function handleChange(e) {
        setNewCommentData(e.target.value);
    }

    async function handleComment(e) {
        e.preventDefault();
        if (user) {
            try {
                const addedComment = await addComment(comments, newCommentData, user)
                console.log('addedComment',addedComment)
                setNewCommentData('')
                const commentsData = await getComments(battle.comments)
                setComments(commentsData)
            } catch (error) {
                console.log(error)
            }
        } else {
            navigate('/auth')
        }
    }

    async function handleDeleteComment(e, comment) {
        console.log(user)
        if (user) {
            try {

                const removedComment = await removeComment(comments, e.target.id, user)
                const commentsData = await getComments(battle.comments)
                setComments(commentsData)
            } catch (error) {
                console.log(error)
            }
        }

    }

    async function handleRequest() {
        try {
            const battleData = await getBattle(id)
            setBattle(battleData)

            const likesData = await getLikes(battleData.likes)
            setLikes(likesData)

            const commentsData = await getComments(battleData.comments)
            setComments(commentsData)
            console.log(commentsData)

            if (user) {
                if (likesData.likes.includes(user._id)) {
                    setLikeSource(require('../../assets/liked.png'))
                }
            }

        } catch (err) {
            navigate('/404')
            console.log(err)
        }
    }

    useEffect(() => {
        setUpdatedSearch('')
        handleRequest()
    }, [])

    return (
        <section className="ShowBattle">
            {battle && likes && comments ? (
                <>
                    {battle.winner === "Draw" ? (
                        <div className="outcome">
                            <h2>{battle.winner}</h2>
                        </div>
                    ) : (
                        <div className="outcome">
                            <h2>Champion</h2>
                            <h3>{battle.winner}</h3>
                        </div>
                    )}
                    <div className="whole-battle">
                        <Link to={`/heroes/${battle.superOneId}`}>
                            <BattleChampion image={battle.superOneImage} name={battle.superOneName} />
                        </Link>

                        <div className="show-battle-vs">
                            <h2 className="vs">VS</h2>
                        </div>

                        <Link to={`/heroes/${battle.superTwoId}`}>
                            <BattleChampion image={battle.superTwoImage} name={battle.superTwoName} />
                        </Link>

                    </div>
                    {battle.details ? (
                        <div className="show-battle-details">
                            <h3>Details:</h3>
                            <p>{battle.details}</p>
                        </div>
                    ) : null}
                    <div className="social">
                        <div className="like-comment">
                            <div className="likes">
                                <img className="heart" src={likeSource} onClick={handleLike} />
                                <p className="like-count">{likes.likes?.length} {likes.likes?.length === 1 ? "Like" : "Likes"}</p>
                            </div>
                            <div className="comment">
                                <p className="like-count">{comments.comments.length} {battle.comments.length === 1 ? "Comment" : "Comments"}</p>
                            </div>
                        </div>
                        <div className="comments-section">
                            {comments.comments.length > 0 ? comments.comments.map((pulledComment, idx) => {
                                console.log(pulledComment)
                                return (
                                    <div className="comment-box">
                                        <div key={idx} className={idx === (comments.comments.length - 1) ? "indiv-comment no-bottom" : "indiv-comment"}>
                                            <p className="username">{pulledComment.username}</p>
                                            <p>{pulledComment.textContent}</p>
                                        </div>
                                        {user?(user._id === pulledComment.owner ? (
                                            <p className="delete-comment" id={idx} onClick={(e) => handleDeleteComment(e, pulledComment)} >X</p>
                                        ) : null):null}
                                    </div>
                                )
                            }) : (
                                <div className="no-comment">
                                    <p>No comments yet</p>
                                </div>
                            )}
                        </div>
                        <form className="create-comments" onSubmit={handleComment}>
                            {user ? (
                                <input type="text" onChange={handleChange} value={newCommentData} placeholder="Say something super!" />
                            ) : (
                                <input type="text" onChange={handleChange} value={newCommentData} placeholder="Login to say something super!" disabled />
                            )}
                            <button type="submit">POST</button>
                        </form>
                        <p className="by">Posted by {battle.owner.username}</p>

                    </div>
                    {
                        isOwner ? (
                            <Link to={`/battles/${id}/edit`}>
                                <button className="show-battle-edit">Edit</button>
                            </Link>
                        ) : null}
                </>
            ) :
                <Loading />
            }
        </section >
    )
}