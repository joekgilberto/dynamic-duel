import "./ShowSuper.css"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { Link } from "react-router-dom";
import { getSuper } from "../../utilities/super/super-services";
import { upperCase } from "../../utilities/tools";
import { useContext } from "react";
import { UserContext } from "../../data";
import { addFavorite, removeFavorite } from "../../utilities/auth/auth-services";

import Loading from "../../components/Loading/Loading";

export default function ShowSuper({ setUpdatedSearch }) {
    const { user } = useContext(UserContext);
    const [showSuper, setShowSuper] = useState(null)
    const [favorite, setFavorite] = useState(null)
    const [favoriteErr, setFavoriteErr] = useState(null)

    const id = useParams().id
    const navigate = useNavigate()

    async function handleFavorite(e) {
        if (user) {
            if (user.favorites.includes(showSuper.id)) {
                setFavorite(require('../../assets/favorite.png'))
                removeFavorite(user, showSuper.id)
            } else if (!user.favorites.includes(showSuper.id) && user.favorites.length < 3) {
                setFavorite(require('../../assets/favorited.png'))
                addFavorite(user, showSuper.id)
            } else if (!user.favorites.includes(showSuper.id) && user.favorites.length >= 3) {
                setFavoriteErr('You already have all three favorite spots filled!  Remove one to add another.')
            }
        }
    }

    async function handleRequest() {
        const superResponse = await getSuper(id);
        if (superResponse) {
            if (superResponse.error) {
                navigate('/404')
            } else {
                setShowSuper(superResponse);
                if (user) {
                    if (user.favorites.includes(superResponse.id)) {
                        setFavorite(require('../../assets/favorited.png'))
                    } else {
                        setFavorite(require('../../assets/favorite.png'))
                    }
                }
            }
        } else {
            console.log(superResponse);
        }
    }

    useEffect(() => {
        setUpdatedSearch('')
        handleRequest()
    }, [])

    return (
        <section className="ShowSuper">
            {showSuper ?
                <div>
                    <div className="info-card">
                        <img
                            src={showSuper.image.url}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = require("../../assets/image-not-found.png");
                                currentTarget.className = "contain";
                            }}
                            alt={showSuper.name}
                        />
                        <h2>{showSuper.name}</h2>
                        {user ?
                            <div className="show-super-fav" onClick={handleFavorite}>
                                <img className="star" src={favorite} alt="favorite" />
                                <p>Favorite</p>
                            </div>
                            : null}
                        <p className="fav-error">{favoriteErr}</p>

                        <div className="info">
                            <p className="bold">Alter-Ego:</p>
                            <p>{showSuper.biography["full-name"] !== "" ? showSuper.biography["full-name"] : "Not recorded"}</p>
                        </div>
                        <div className="info">
                            <p className="bold">Species:</p>
                            <p>{showSuper.appearance.race !== "null" ? showSuper.appearance.race : "Not recorded"}</p>
                        </div>
                        <div className="info">
                            <p className="bold">Alignment:</p>
                            <p className={showSuper.biography.alignment === "good" ? "alignment good" : (showSuper.biography.alignment === "bad" ? "alignment bad" : (showSuper.biography.alignment === "neutral" ? "alignment neutral" : null))} >{showSuper.biography.alignment !== "-" ? upperCase(showSuper.biography.alignment) : "Not recorded"}</p>
                        </div>
                        <div className="info">
                            <p className="bold">First Appearance:</p>
                            <p>{showSuper.biography["first-appearance"] !== "-" ? showSuper.biography["first-appearance"] : "Not recorded"}</p>
                        </div>
                        <div className="info no-bar">
                            <p className="bold">Publisher:</p>
                            <p>{showSuper.biography.publisher !== "null" ? showSuper.biography.publisher : "Not recorded"}</p>
                        </div>
                    </div>
                    <div className="stats-fight">
                        <div className="stats-card">
                            <h2>Stats</h2>
                            <div className="stats">
                                <p className="bold">Height:</p>
                                <p>{showSuper.appearance.height[0] === "-" ? "Not recorded" : showSuper.appearance.height[0]}</p>
                            </div>
                            <div className="stats">
                                <p className="bold">Weight:</p>
                                <p>{showSuper.appearance.weight[0] === "- lb" ? "Not recorded" : showSuper.appearance.weight[0]}</p>
                            </div>
                            <div className="stats">
                                <p className="bold">Intelligence:</p>
                                <p>{showSuper.powerstats.intelligence !== "null" ? showSuper.powerstats.intelligence : "Not recorded"}</p>
                            </div>
                            <div className="stats">
                                <p className="bold">Strength:</p>
                                <p>{showSuper.powerstats.strength !== "null" ? showSuper.powerstats.strength : "Not recorded"}</p>
                            </div>
                            <div className="stats">
                                <p className="bold">Speed:</p>
                                <p>{showSuper.powerstats.speed !== "null" ? showSuper.powerstats.speed : "Not recorded"}</p>
                            </div>
                            <div className="stats">
                                <p className="bold">Durability:</p>
                                <p>{showSuper.powerstats.durability !== "null" ? showSuper.powerstats.durability : "Not recorded"}</p>
                            </div>
                            <div className="stats">
                                <p className="bold">Power:</p>
                                <p>{showSuper.powerstats.power !== "null" ? showSuper.powerstats.power : "Not recorded"}</p>
                            </div>
                            <div className="stats no-bar">
                                <p className="bold">Combat:</p>
                                <p>{showSuper.powerstats.combat !== "null" ? showSuper.powerstats.combat : "Not recorded"}</p>
                            </div>

                        </div>
                        {user ?
                            <Link to={`/battles/new/${id}`}>
                                <button className="start-a-fight">Start a fight!</button>
                            </Link>
                            : null}

                    </div>

                </div>
                : <Loading />}
        </section>
    )
}