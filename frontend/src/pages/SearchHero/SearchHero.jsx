import "./SearchHero.css"

import { useState, useEffect } from "react"
import { searchSuper } from "../../utilities/super-service"
import { useParams } from "react-router"
import { Link } from "react-router-dom"

export default function SearchHero({setUpdatedSearch}){

    const id = useParams().id
    const [foundHeroes,setFoundHeroes] = useState(null)

    async function handleRequest(){
        const searchResults = await searchSuper(id)
        console.log(searchResults)
        setFoundHeroes(searchResults.results)
        console.log(foundHeroes)
    }

    useEffect(() => {
        setUpdatedSearch('')
        handleRequest()
    }, [])

    return(
        <section className="SearchHero">
            <section className="Home">
            {foundHeroes ? foundHeroes.map((hero, idx) =>
                <Link to={`/heroes/${hero.id}`}>
                    <div key={idx} className="home-hero">
                        <img src={hero.image.url} alt={hero.name} />
                        <p>{hero.name}</p>
                    </div>
                </Link>

            ) :
                <p>Loading</p>}
        </section>
            
        </section>
    )
}