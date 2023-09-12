import "./SelectSuper.css"

import { useState, useEffect } from "react"
import { searchSuper, getSuper } from "../../utilities/super/super-services"
import SuperCard from "../SuperCard/SuperCard"

export default function SelectSuper({ superSearched, setSuper, battleSearched, setBattleSearched, setSuperTyping, thisSuper, id }) {

    const [foundSupers, setFoundSupers] = useState(null)

    async function handleRequest() {
        if (id >= 1 && id  <= 732) {
            const autoSuper = await getSuper(id)
            setSuper(autoSuper)
            setBattleSearched(false)

        } else {
            const searchResults = await searchSuper(superSearched)
            setFoundSupers(searchResults.results)
        }

    }

    useEffect(() => {
        handleRequest()
        setSuperTyping('')
        setBattleSearched(false)
    }, [battleSearched])

    function handleClick(e, superhero) {
        setSuper(superhero)
    }

    return (
        <section className="SelectSuper">
            {thisSuper ? <SuperCard superhero={thisSuper} /> : (
                foundSupers ? foundSupers.map((superhero, idx) =>
                    <div key={idx} onClick={(e) => { handleClick(e, superhero) }}>
                        <SuperCard superhero={superhero} />
                    </div>

                ) : null
            )}
        </section>
    )
}