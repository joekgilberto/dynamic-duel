import "./ShowBattle.css"

import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router'
import { Link } from "react-router-dom"
import { getBattle } from "../../utilities/battle-services"
import { addLike, getLikes, removeLike } from "../../utilities/likes-services"
import { UserContext } from "../../data"

import Loading from "../../components/Loading/Loading"
import BattleChampion from "../../components/BattleChampion/BattleChampion"

export default function ShowBattle({ setUpdatedSearch }) {

    const navigate = useNavigate()
    const { id } = useParams()

    const [battle, setBattle] = useState(null)
    const [likes, setLikes] = useState(null)
    const [likeSource,setLikeSource] = useState(require('../../assets/like.png'))
    let isOwner;

    const { user } = useContext(UserContext);

    if (user) {
        isOwner = battle?.owner?._id === user._id;
    } else {
        isOwner = false;
    }

    async function handleLike(e){
        if(user){
            if (likes.likes.includes(user._id)){
                console.log('unlike')
                setLikeSource(require('../../assets/like.png'))
                removeLike(likes._id, likes,user._id)
            } else {
                console.log('like')
                setLikeSource(require('../../assets/liked.png'))
                addLike(likes._id, likes,user._id)
            }
        } else{
            navigate("/auth")
        }
    }

    async function handleRequest() {
        try {
            const battleData = await getBattle(id)
            setBattle(battleData)
            const likesData = await getLikes(battleData.likes)
            setLikes(likesData)
            if(user){
                console.log(user._id)
                console.log(likesData.likes)
                if (likesData.likes.includes(user._id)){
                    setLikeSource(require('../../assets/liked.png'))
                }   
            }
            
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        setUpdatedSearch('')
        handleRequest()
        console.log(battle)
    }, [])

    return (
        <section className="ShowBattle">
            {battle && likes ? (
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
                    <div className="like-comment">
                        <div className="likes">
                            <img className="heart" src={likeSource} onClick={handleLike} />
                            <p className="like-count">{likes.likes?.length} {likes.likes?.length===1?"Like":"Likes"}</p>
                        </div>
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