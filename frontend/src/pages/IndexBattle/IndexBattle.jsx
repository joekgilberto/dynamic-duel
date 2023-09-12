import "./IndexBattle.css"

import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllBattles } from "../../utilities/battle/battle-services";

import Loading from "../../components/Loading/Loading";
import BattleCard from "../../components/BattleCard/BattleCard";

export default function IndexBattle({setUpdatedSearch}){
    
    const [indexBattles, setIndexBattles] = useState(null)

    async function handleRequest() {
        const battlesResponse = await getAllBattles();

        if (battlesResponse) {
            battlesResponse.reverse()
            setIndexBattles(battlesResponse);
        } else {
            console.log(battlesResponse);
        }


    };

    useEffect(() => {
        setUpdatedSearch('')
        handleRequest();
    }, []);

    return(
        <section className="IndexBattle">
            {indexBattles ? indexBattles.map((battle, idx) =>
                    <Link key={idx} to={`/battles/${battle._id}`}>
                        <BattleCard battle={battle} />
                    </Link>
                ) :
                    <Loading />}
        </section>
    )
}