import "./Home.css"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { getSixSupers } from "../../utilities/super-service";


export default function Home({setUpdatedSearch}) {
    const [homeHeroes, setHomeHeroes] = useState(null)

    async function handleRequest() {
        const superResponse = await getSixSupers();

        if (superResponse) {
            setHomeHeroes(superResponse);
        } else {
            console.log(superResponse);
            // context update for error handling might be called
        }


    };

    useEffect(() => {
        setUpdatedSearch('')
        handleRequest();
    }, []);

    return (
        <section className="Home">
            <h1 className="welcome">Welcome to Dynamic Duel</h1>
            {homeHeroes ? homeHeroes.map((hero, idx) =>
                <Link to={`/heroes/${hero.id}`}>
                    <div key={idx} className="home-hero">
                        <img src={hero.image.url} alt={hero.name} />
                        <p>{hero.name}</p>
                    </div>
                </Link>

            ) :
                <p>Loading</p>}
        </section>
    )
}