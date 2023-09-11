import "./User.css"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../data";
import { useNavigate } from "react-router";
import { getUserBattles } from "../../utilities/battle-services";
import { getSuper } from "../../utilities/super-services";
import { Link } from "react-router-dom";

import HeroCard from "../../components/HeroCard/HeroCard";
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
            // context update for error handling might be called
        }

        let favoritesResponse = []
        for (let fav of user.favorites){
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
            {user ? (
                <>
                    <h1 className="headline">Welcome, {user.username}!</h1>
                    {userFavorites?(
                        <div>
                            {console.log(userFavorites)}
                           {userFavorites.map((fav, idx) =>
                            <Link key={idx} to={`/heroes/${fav.id}`}>
                                <HeroCard hero={fav} />
                            </Link>)}
                        </div>
                    ):<Loading />}
                    <div className="user-battles">
                        {usersBattles ? (usersBattles.length ? usersBattles.map((battle, idx) =>
                            <Link key={idx} to={`/battles/${battle._id}`}>
                                <BattleCard battle={battle} />
                            </Link>) : <h1 className="no-battles-yet">No battles yet, go pick some fights!</h1>
                        ) :
                            <Loading />}
                    </div>
                </>
            ) : null}
        </section>
    )
}