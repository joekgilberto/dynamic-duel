import { useState, useEffect } from "react"

import { getSixSupers } from "../../utilities/super-service";


export default function Home() {
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
        handleRequest();
        
    }, []);

    return (
        <section className="Home">
            <h3>Home</h3>
            {homeHeroes ? homeHeroes.map((hero, idx) => <p key={idx}>{hero.name}</p>) : <p>Loading</p>}
        </section>
    )
}