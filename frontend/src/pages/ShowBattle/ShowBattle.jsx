import "./ShowBattle.css"

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { getBattle } from "../../utilities/battle-services"

import Loading from "../../components/Loading/Loading"
import HeroCard from "../../components/HeroCard/HeroCard"

export default function ShowBattle({ setUpdatedSearch }) {

    const { id } = useParams()
    const [battle, setBattle] = useState(null)

    const navigate = useNavigate()

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
                        <div className="show-battle-info left">
                            <div className="show-battle-display">
                                <img className="show-battle-image" src={battle.superOneImage} alt={battle.superOneName} onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = require("../../assets/image-not-found.png");
                                    currentTarget.className = "show-battle-image contain";
                                }} />
                                <h1>{battle.superOneName}</h1>
                            </div>
                        </div>
                        <div className="show-battle-vs">
                            <h2 className="vs">VS</h2>
                        </div>

                        <div className="show-battle-info right">
                            <div className="show-battle-display">
                                <img className="show-battle-image" src={battle.superTwoImage} alt={battle.superTwoName} onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = require("../../assets/image-not-found.png");
                                    currentTarget.className = "show-battle-image contain";
                                }} />
                                <h1>{battle.superTwoName}</h1>
                            </div>
                        </div>
                    </div>
                    {battle.details ? (
                        <div className="show-battle-details">
                            <h3>Details:</h3>
                            <p>{battle.details}</p>
                        </div>
                    ) : null}
                </>
            ) :
                <Loading />}
        </section>
    )
}