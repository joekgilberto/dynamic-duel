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
                {battle.winner === "Draw" ? <h2 className="outcome">{battle.winner}</h2> : (
                            <div className="outcome">
                                <h2>Champion:</h2>
                                <h3>{battle.winner}</h3>
                            </div>
                        )}
                        <div>
                    <div className="battle-details">
                        <img src={battle.superOneImage} alt={battle.superOneName} onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = require("../../assets/image-not-found.png");
                            currentTarget.className = "contain";
                        }} />
                        <h1>{battle.superOneName}</h1>
                    </div>
                    <div>
                        <h2>VS</h2>
                        {battle.details ? <p>{battle.details}</p> : null}
                    </div>

                    <div>
                        <img src={battle.superTwoImage} alt={battle.superTwoName} onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = require("../../assets/image-not-found.png");
                            currentTarget.className = "contain";
                        }} />
                        <h1>{battle.superTwoName}</h1>
                    </div>
                    </div>
                </>
            ) :
                <Loading />}
        </section>
    )
}