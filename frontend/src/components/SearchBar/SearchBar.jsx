import "./SearchBar.css"

import { useNavigate } from "react-router";

export default function SearchBar(){

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            navigate(`/`)
        } catch (error) {
            navigate(`/`)
        }
    }

    return(
        <form className="SearchBar" onSubmit={handleSubmit}>
              <input className="search-input" type="text" placeholder="Search a super.." />
              <button className="search-button" type="submit"><img className="magnifying-glass" src="https://i.imgur.com/I4smiGB.png" /></button>
        </form>
    )
}