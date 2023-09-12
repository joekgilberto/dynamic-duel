import "./Home.css"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { getEightSupers } from "../../utilities/super/super-services";

import Loading from "../../components/Loading/Loading";
import SuperCard from "../../components/SuperCard/SuperCard";


export default function Home({ setUpdatedSearch }) {
    const [homeSupers, setHomeSupers] = useState(null)

    async function handleRequest() {
        const superResponse = await getEightSupers();
        if (superResponse) {
            setHomeSupers(superResponse);
        } else {
            console.log(superResponse);
        }
    };

    async function handleClick(e) {
        setHomeSupers(null)
        const superResponse = await getEightSupers();
        if (superResponse) {
            setHomeSupers(superResponse);
        } else {
            console.log(superResponse);
        }
    }

    useEffect(() => {
        setUpdatedSearch('')
        handleRequest();
    }, []);

    return (
        <section className="Home">
            <h1 className="headline">Welcome to Dynamic Duel</h1>
            <div className="super-results">
                {homeSupers ? homeSupers.map((superhero, idx) =>
                    <Link key={idx} to={`/supers/${superhero.id}`}>
                        <SuperCard superhero={superhero} />
                    </Link>
                ) :
                    <Loading />}
            </div>
            {homeSupers?<button className="more-supers" onClick={handleClick}>More Supers</button>:null}
        </section>
    )
}