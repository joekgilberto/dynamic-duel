import "./SearchSuper.css"

import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { searchSuper } from "../../utilities/super/super-services"

import Loading from "../../components/Loading/Loading";
import SuperCard from "../../components/SuperCard/SuperCard"

export default function SearchSuper({ setUpdatedSearch, searched, setSearched }) {

    const id = useParams().id
    const [foundSupers, setFoundSupers] = useState(null)

    async function handleRequest() {
        const searchResults = await searchSuper(id)
        setFoundSupers(searchResults.results)
        setSearched(false)
    }

    useEffect(() => {
        setUpdatedSearch('')
        handleRequest()
    }, [searched])

    return (
        <section className="SearchSuper">
            <div className="super-results">
                {foundSupers ? foundSupers.map((superhero, idx) =>
                    <Link key={idx} to={`/supers/${superhero.id}`}>
                        <SuperCard superhero={superhero} />
                    </Link>

                ) : searched ?
                    <Loading /> : <h2 className="none-found">No supers found for "{id}"</h2>}
            </div>
        </section>
    )
}