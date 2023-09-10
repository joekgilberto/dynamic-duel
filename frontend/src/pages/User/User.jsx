import "./User.css"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../data";
import { useNavigate } from "react-router";
import { getAllBattles } from "../../utilities/battle-services";
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
        let battlesResponse = await getAllBattles();
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
            {user && usersBattles ? usersBattles.map((battle, idx) =>
                <Link key={idx} to={`/battles/${battle._id}`}>
                    <BattleCard battle={battle} />
                </Link>
            ) :
                <Loading />}
        </section>
    )
}