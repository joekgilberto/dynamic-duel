import "./ShowBattle.css"

import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router'
import { Link } from "react-router-dom"
import { getBattle } from "../../utilities/battle-services"
import { UserContext } from "../../data"

import Loading from "../../components/Loading/Loading"
import BattleChampion from "../../components/BattleChampion/BattleChampion"

export default function ShowBattle({ setUpdatedSearch }) {

    const navigate = useNavigate()
    const { id } = useParams()

    const [battle, setBattle] = useState(null)
    let isOwner

    const { user } = useContext(UserContext);

    if (user) {
        isOwner = battle?.owner?._id === user._id;
    } else {
        isOwner = false;
    }

    async function handleRequest() {
        try {
            const battleData = await getBattle(id)
            setBattle(battleData)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        setUpdatedSearch('')
        handleRequest()
    }, [])

    return (
        <section className="ShowBattle">
            {battle ? (
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
                    {
                        isOwner ? (
                            <Link to={`/battles/${id}/edit`}>
                                <button className="show-battle-edit">Edit</button>
                            </Link>
                        ) : null}
                </>
            ) :
                <Loading />}
        </section>
    )
}