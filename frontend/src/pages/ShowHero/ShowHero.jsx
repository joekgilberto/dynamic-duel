import "./ShowHero.css"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { Link } from "react-router-dom";
import { getSuper } from "../../utilities/super-services";
import { upperCase } from "../../utilities/tools";

import Loading from "../../components/Loading/Loading";

export default function ShowHero({ setUpdatedSearch }) {

    const [showHero, setShowHero] = useState(null)

    const id = useParams().id
    const navigate = useNavigate()

    async function handleRequest() {
        const superResponse = await getSuper(id);

        if (superResponse) {
            if (superResponse.error) {
                navigate('/404')
            } else {
                setShowHero(superResponse);
            }
        } else {
            console.log(superResponse);
            // context update for error handling might be called
        }
    }

    useEffect(() => {
        setUpdatedSearch('')
        handleRequest()
    }, [])

    return (
        <section className="ShowHero">
            {showHero ?
                <div>
                    <div className="info-card">
                        <img
                            src={showHero.image.url}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = require("../../assets/image-not-found.png");
                                currentTarget.className = "contain";
                            }}
                            alt={showHero.name}
                        />
                        <h2>{showHero.name}</h2>
                        <div className="info">
                            <p className="bold">Alter-Ego:</p>
                            <p>{showHero.biography["full-name"] !== "" ? showHero.biography["full-name"] : "Not recorded"}</p>
                        </div>
                        <div className="info">
                            <p className="bold">Species:</p>
                            <p>{showHero.appearance.race !== "null" ? showHero.appearance.race : "Not recorded"}</p>
                        </div>
                        <div className="info">
                            <p className="bold">Alignment:</p>
                            <p className={showHero.biography.alignment === "good" ? "alignment good" : (showHero.biography.alignment === "bad" ? "alignment bad" : (showHero.biography.alignment === "neutral" ? "alignment neutral" : null))} >{showHero.biography.alignment !== "-" ? upperCase(showHero.biography.alignment) : "Not recorded"}</p>
                        </div>
                        <div className="info">
                            <p className="bold">First Appearance:</p>
                            <p>{showHero.biography["first-appearance"] !== "-" ? showHero.biography["first-appearance"] : "Not recorded"}</p>
                        </div>
                        <div className="info no-bar">
                            <p className="bold">Publisher:</p>
                            <p>{showHero.biography.publisher !== "null" ? showHero.biography.publisher : "Not recorded"}</p>
                        </div>
                    </div>
                    <div className="stats-card">
                        <h2>Stats</h2>
                        <div className="stats">
                            <p className="bold">Height:</p>
                            <p>{showHero.appearance.height[0] === "-" ? "Not recorded" : showHero.appearance.height[0]}</p>
                        </div>
                        <div className="stats">
                            <p className="bold">Weight:</p>
                            <p>{showHero.appearance.weight[0] === "- lb" ? "Not recorded" : showHero.appearance.weight[0]}</p>
                        </div>
                        <div className="stats">
                            <p className="bold">Intelligence:</p>
                            <p>{showHero.powerstats.intelligence !== "null" ? showHero.powerstats.intelligence : "Not recorded"}</p>
                        </div>
                        <div className="stats">
                            <p className="bold">Strength:</p>
                            <p>{showHero.powerstats.strength !== "null" ? showHero.powerstats.strength : "Not recorded"}</p>
                        </div>
                        <div className="stats">
                            <p className="bold">Speed:</p>
                            <p>{showHero.powerstats.speed !== "null" ? showHero.powerstats.speed : "Not recorded"}</p>
                        </div>
                        <div className="stats">
                            <p className="bold">Durability:</p>
                            <p>{showHero.powerstats.durability !== "null" ? showHero.powerstats.durability : "Not recorded"}</p>
                        </div>
                        <div className="stats">
                            <p className="bold">Power:</p>
                            <p>{showHero.powerstats.power !== "null" ? showHero.powerstats.power : "Not recorded"}</p>
                        </div>
                        <div className="stats no-bar">
                            <p className="bold">Combat:</p>
                            <p>{showHero.powerstats.combat !== "null" ? showHero.powerstats.combat : "Not recorded"}</p>
                        </div>
                        <Link to={`/battles/new/${id}`}>
                            <button className="start-a-fight">Start a fight!</button>
                        </Link>
                    </div>
                    
                </div>
                : <Loading />}
        </section>
    )
}