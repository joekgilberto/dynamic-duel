import "./SearchHero.css"

import { useState, useEffect } from "react"
import { searchSuper } from "../../utilities/super-service"
import { useParams } from "react-router"
import { Link } from "react-router-dom"

import Loading from "../../components/Loading/Loading";
import HeroCard from "../../components/HeroCard/HeroCard"

export default function SearchHero({setUpdatedSearch,searched,setSearched}){

    const id = useParams().id
    const [foundHeroes,setFoundHeroes] = useState(null)

    async function handleRequest(){
        const searchResults = await searchSuper(id)
        setFoundHeroes(searchResults.results)
    }

    useEffect(() => {
        setUpdatedSearch('')
        handleRequest()
        setSearched(false)
    }, [searched])

    return(
        <section className="SearchHero">
            <section className="Home">
            {foundHeroes ? foundHeroes.map((hero, idx) =>
                <Link key={idx} to={`/heroes/${hero.id}`}>
                    <HeroCard hero={hero} />
                </Link>

            ) :
                <Loading />}
        </section>
            
        </section>
    )
}