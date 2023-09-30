import "./SearchBar.css"

import { useNavigate } from "react-router";
import { searchString } from "../../utilities/tools";

export default function SearchBar({ updatedSearch, setUpdatedSearch, setSearched }) {

    const navigate = useNavigate()

    function handleChange(e) {
        setUpdatedSearch(e.target.value)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setSearched(true)
            navigate(`/supers/search/${searchString(updatedSearch)}`)
            setUpdatedSearch('')
        } catch (error) {
            navigate(`/`)
            setUpdatedSearch('')
        }
    }

    return (
        <div className="SearchBar">
            <form className="search-form" onSubmit={handleSubmit}>
                <input className="search-input" type="text" placeholder="Search a super..." onChange={handleChange} value={updatedSearch} />
                <button className="search-button" type="submit"><img className="magnifying-glass" src={require("../../assets/search.png")} alt="maginifying glass" /></button>
            </form>
        </div>
    )
}