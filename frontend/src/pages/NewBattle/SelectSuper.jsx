import "./SelectSuper.css"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { searchSuper } from "../../utilities/super-service"

import HeroCard from "../../components/HeroCard/HeroCard"
import Loading from "../../components/Loading/Loading"

export default function SelectSuper({ superSearched, setSuper, battleSearched, setBattleSearched, setSuperTyping, thisSuper }) {

    const [foundHeroes, setFoundHeroes] = useState(null)

    async function handleRequest() {
        const searchResults = await searchSuper(superSearched)
        setFoundHeroes(searchResults.results)
    }

    useEffect(() => {
        handleRequest()
        setSuperTyping('')
        setBattleSearched(false)
    }, [battleSearched])

    function handleClick(e,hero){
        setSuper(hero)
    }

    return (
        <section className="SelectSuper">
            {thisSuper? <HeroCard hero={thisSuper} />:(
            foundHeroes ? foundHeroes.map((hero, idx) =>
            <div onClick={(e)=>{handleClick(e,hero)}}>
                    <HeroCard key={idx} hero={hero} />
            </div>

            ) : superSearched ?
                <Loading /> : <h2 className="none-found">Search a hero!</h2>
            )}
        </section>
    )
}