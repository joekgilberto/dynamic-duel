import "./SelectSuper.css"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { searchSuper, getSuper } from "../../utilities/super-services"

import HeroCard from "../HeroCard/HeroCard"
import Loading from "../Loading/Loading"

export default function SelectSuper({ superSearched, setSuper, battleSearched, setBattleSearched, setSuperTyping, thisSuper, id }) {

    const [foundHeroes, setFoundHeroes] = useState(null)

    async function handleRequest() {
        if (id >= 1 && id  <= 732) {
            const autoHero = await getSuper(id)
            console.log(autoHero)
            setSuper(autoHero)
            setBattleSearched(false)

        } else {
            const searchResults = await searchSuper(superSearched)
            setFoundHeroes(searchResults.results)
        }

    }

    useEffect(() => {
        handleRequest()
        setSuperTyping('')
        setBattleSearched(false)
    }, [battleSearched])

    function handleClick(e, hero) {
        setSuper(hero)
    }

    return (
        <section className="SelectSuper">
            {thisSuper ? <HeroCard hero={thisSuper} /> : (
                foundHeroes ? foundHeroes.map((hero, idx) =>
                    <div key={idx} onClick={(e) => { handleClick(e, hero) }}>
                        <HeroCard hero={hero} />
                    </div>

                ) : null
            )}
        </section>
    )
}