import "./User.css"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../data";
import { useNavigate } from "react-router";
import { getUserBattles } from "../../utilities/battle/battle-services";
import { getSuper } from "../../utilities/super/super-services";
import { Link } from "react-router-dom";

import FavCard from "../../components/FavCard/FavCard";
import BattleCard from "../../components/BattleCard/BattleCard";
import Loading from "../../components/Loading/Loading";

export default function User({ setUpdatedSearch }) {
    const { user } = useContext(UserContext);
    const navigate = useNavigate()
    const [usersBattles, setUsersBattles] = useState(null)
    const [userFavorites, setUserFavorites] = useState(null)

    async function handleRequest() {
        let battlesResponse = await getUserBattles(user._id);
        if (battlesResponse) {
            battlesResponse.reverse()
            setUsersBattles(battlesResponse);
        } else {
            console.log(battlesResponse);
        }

        let favoritesResponse = []
        for (let fav of user.favorites) {
            const foundFav = await getSuper(fav)
            favoritesResponse.push(foundFav)
        }
        setUserFavorites(favoritesResponse)
    }

    useEffect(() => {
        if (!user) {
            navigate('/auth')
        } else {
            handleRequest()
        }
    }, [])

    return (
        <section className="User">
            {user && userFavorites && usersBattles ? (
                <>
                    <h1 className="headline">Welcome, {user.username}!</h1>
                    <h2 className="your-supers-headline">Your Favorite Supers</h2>

                    
                        <div className="user-favorties">
                            {userFavorites.map((fav, idx) =>
                                <Link key={idx} to={`/supers/${fav.id}`}>
                                    <FavCard superhero={fav} />
                                </Link>)}
                        </div>
                    <h2 className="your-battles-headline">Your Battles</h2>
                    <div className="user-battles">
                        {usersBattles.length ? usersBattles.map((battle, idx) =>
                            <Link key={idx} to={`/battles/${battle._id}`}>
                                <BattleCard battle={battle} />
                            </Link>) : <h1 className="no-battles-yet">No battles yet, go pick some fights!</h1>}
                    </div>
                </>
            ) : <Loading />}
        </section>
    )
}