import "./Home.css"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { getSixSupers } from "../../utilities/super-service";

import Loading from "../../components/Loading/Loading";
import HeroCard from "../../components/HeroCard/HeroCard";


export default function Home({ setUpdatedSearch }) {
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
            <div className="hero-results">
                {homeHeroes ? homeHeroes.map((hero, idx) =>
                    <Link key={idx} to={`/heroes/${hero.id}`}>
                        <HeroCard hero={hero} />
                    </Link>
                ) :
                    <Loading />}
            </div>
        </section>
    )
}