import "./Home.css"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { getEightSupers } from "../../utilities/super/super-services";

import Loading from "../../components/Loading/Loading";
import SuperCard from "../../components/SuperCard/SuperCard";


export default function Home({ setUpdatedSearch }) {
    const [homeSupers, setHomeSupers] = useState(null);
    const [intro, setIntro] = useState(false);

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
            <h2>It's a bird! It's a plane! It's...</h2>
            <h1 className="headline">Dynamic Duel</h1>
            {intro?(
                <>
                    <button className="modal-button" onClick={()=>{setIntro(!intro)}}>Close</button>
                    <div className="intro">
                        <p>
                            This full-stack MERN application is your gateway to the extraordinary world of superheroes and supervillains! It's your own personal super encyclopedia, available whenever you need it. We encourage you to join our vibrant community of fans, where you can share your thoughts on epic super battles, and like and comment on others' posts.
                        </p>
                    </div>
                </>
            ) : (
                <button className="modal-button" onClick={()=>{setIntro(!intro)}}>Info</button>
            )}
            <p>Dynamic Duel is currently under construction. Please come back later, or reach out to <a href='https://joekgilberto.com/contact' target='_blank' style={{color: '#f25555ff'}}>Joe Gilberto</a> for more information!</p>
            {/* <div className="super-results">
                {homeSupers ? homeSupers.map((superhero, idx) =>
                    <Link key={idx} to={`/supers/${superhero.id}`}>
                        <SuperCard superhero={superhero} />
                    </Link>
                ) :
                    <Loading />}
            </div>
            {homeSupers ? <button className="more-supers" onClick={handleClick}>More Supers</button> : null} */}
        </section>
    )
}