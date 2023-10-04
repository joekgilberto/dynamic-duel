import "./OtherUser.css"
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../data";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getSuper } from "../../utilities/super/super-services";
import { getUser } from "../../utilities/auth/auth-services";
import { getOtherUserBattles } from "../../utilities/battle/battle-services";

import FavCard from "../../components/FavCard/FavCard";
import BattleCard from "../../components/BattleCard/BattleCard";
import Loading from "../../components/Loading/Loading";

export default function User({ setUpdatedSearch }) {
    const { id } = useParams()
    const { user } = useContext(UserContext);
    const navigate = useNavigate()

    const [otherUser, setOtherUser] = useState(null)
    const [otherUsersBattles, setOtherUsersBattles] = useState(null)
    const [otherUsersFavorites, setOtherUserFavorites] = useState(null)

    async function handleRequest() {
        let otherUserResponse = await getUser(id)
        if (otherUserResponse) {
            setOtherUser(otherUserResponse);
        } else {
            console.log(otherUserResponse);
        }

        if (!otherUserResponse) {
            navigate("/404")
        } else {

            if (user) {
                if (user.username === otherUserResponse.username) {
                    navigate("/profile")
                }
            }

            let battlesResponse = await getOtherUserBattles(otherUserResponse.username);
            if (battlesResponse) {
                battlesResponse.reverse()
                setOtherUsersBattles(battlesResponse);
            } else {
                console.log(battlesResponse);
            }

            let favoritesResponse = []
            for (let fav of otherUserResponse.favorites) {
                const foundFav = await getSuper(fav)
                favoritesResponse.push(foundFav)
            }
            setOtherUserFavorites(favoritesResponse)
        }
    }

    useEffect(() => {
        setUpdatedSearch('')
        handleRequest()
    }, [])

    return (
        <section className="OtherUser">
            {otherUser && otherUsersFavorites && otherUsersBattles ? (
                <>
                    <h1 className="headline">Meet, {otherUser.username}!</h1>
                    <h2 className="your-supers-headline">{otherUser.username}'s' Favorite Supers</h2>

                    {otherUsersFavorites.length ? (
                        <div className="user-favorties">
                            {otherUsersFavorites.map((fav, idx) =>
                                <Link key={idx} to={`/supers/${fav.id}`}>
                                    <FavCard superhero={fav} />
                                </Link>)}
                        </div>
                    ) : (
                        <h1 className="none-yet dark-yellow">No favorites yet!</h1>
                    )}
                    <h2 className="your-battles-headline">{otherUser.username}'s Battles</h2>
                    <div className="user-battles">
                        {otherUsersBattles.length ? otherUsersBattles.map((battle, idx) =>
                            <Link key={idx} to={`/battles/${battle._id}`}>
                                <BattleCard battle={battle} />
                            </Link>) : <h1 className="none-yet dark-blue">No battles yet!</h1>}
                    </div>
                </>
            ) : <Loading />}
        </section>
    )
}