import "./ShowHero.css"
import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { getSuper } from "../../utilities/super-service";
import { upperCase } from "../../utilities/tools";

export default function ShowHero() {

    const [showHero, setShowHero] = useState(null)

    const id = useParams().id

    async function handleRequest() {
        const superResponse = await getSuper(id);

        if (superResponse) {
            setShowHero(superResponse);
        } else {
            console.log(superResponse);
            // context update for error handling might be called
        }
    }

    useEffect(() => {
        handleRequest()
    }, [])

    return (
        <section className="ShowHero">
            {showHero ?
                <div>
                    <div className="info-card">
                        <img src={showHero.image.url} alt={showHero.name} />
                        <h2>{showHero.name}</h2>
                        <div className="info">
                            <p className="bold">Alter-Ego:</p>
                            <p>{showHero.biography["full-name"]}</p>
                        </div>
                        <div className="info">
                            <p className="bold">Alignment:</p>
                            <p className={showHero.biography.alignment === "good" ? "good" : showHero.biography.alignment === "bad" ? "bad" : null} >{upperCase(showHero.biography.alignment)}</p>
                        </div>
                        <div className="info">
                            <p className="bold">First Appearance:</p>
                            <p>{showHero.biography["first-appearance"]}</p>
                        </div>
                        <div className="info no-bar">
                            <p className="bold">Publisher:</p>
                            <p>{showHero.biography.publisher}</p>
                        </div>
                    </div>
                    <div className="stats-card">
                        <h2>Stats</h2>
                        <div className="stats">
                            <p className="bold">Species:</p>
                            <p>{showHero.appearance.race}</p>
                        </div>
                        <div className="stats">
                            <p className="bold">Height:</p>
                            <p>{showHero.appearance.height[0]}</p>
                        </div>
                        <div className="stats">
                            <p className="bold">Weight:</p>
                            <p>{showHero.appearance.weight[0]}</p>
                        </div>
                        <div className="stats">
                            <p className="bold">Intelligence:</p>
                            <p>{showHero.powerstats.intelligence}</p>
                        </div>
                        <div className="stats">
                            <p className="bold">Strength:</p>
                            <p>{showHero.powerstats.strength}</p>
                        </div>
                        <div className="stats">
                            <p className="bold">Speed:</p>
                            <p>{showHero.powerstats.speed}</p>
                        </div>
                        <div className="stats">
                            <p className="bold">Durability:</p>
                            <p>{showHero.powerstats.durability}</p>
                        </div>
                        <div className="stats">
                            <p className="bold">Power:</p>
                            <p>{showHero.powerstats.durability}</p>
                        </div>
                        <div className="stats no-bar">
                            <p className="bold">Combat:</p>
                            <p>{showHero.powerstats.combat}</p>
                        </div>
                        
                    </div>
                </div>
                : <p>Loading...</p>}
        </section>
    )
}