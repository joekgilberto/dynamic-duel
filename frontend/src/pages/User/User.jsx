import "./User.css"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../data";
import { useNavigate } from "react-router";
import { getUserBattles } from "../../utilities/battle-services";
import { Link } from "react-router-dom";

import BattleCard from "../../components/BattleCard/BattleCard";
import Loading from "../../components/Loading/Loading";

export default function User({ setUpdatedSearch }) {
    const { user } = useContext(UserContext);
    const navigate = useNavigate()
    const [usersBattles, setUsersBattles] = useState(null)

    if (!user) {
        navigate('/auth')
    }

    async function handleRequest() {
        let battlesResponse = await getUserBattles(user._id);
        console.log(battlesResponse)
        if (battlesResponse) {
            setUsersBattles(battlesResponse);
        } else {
            console.log(battlesResponse);
            // context update for error handling might be called
        }
    }

    useEffect(() => {
        handleRequest()
    }, [])

    return (
        <section className="User">
            <h1 className="headline">Welcome, {user.username}!</h1>
            <div className="user-battles">
            {user && usersBattles ? (usersBattles.length?usersBattles.map((battle, idx) =>
                <Link key={idx} to={`/battles/${battle._id}`}>
                    <BattleCard battle={battle} />
                </Link>):<h1 className="no-battles-yet">No battles yet, go pick some fights!</h1>
            ) :
                <Loading />}
            </div>
        </section>
    )
}