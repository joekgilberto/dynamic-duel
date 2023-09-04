import "./SearchBar.css"

import { useState } from "react";
import { useNavigate } from "react-router";
import { searchString } from "../../utilities/tools";

export default function SearchBar(){

    const navigate = useNavigate()
    const [searchInquiry, setSearchInquiry] = useState('')

    function handleChange(e){
        const updatedSearch = e.target.value
        setSearchInquiry(updatedSearch)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            navigate(`/heroes/search/${searchString(searchInquiry)}`)
        } catch (error) {
            navigate(`/`)
        }
    }

    return(
        <form className="SearchBar" onSubmit={handleSubmit}>
              <input className="search-input" type="text" placeholder="Search a super.." onChange={handleChange} />
              <button className="search-button" type="submit"><img className="magnifying-glass" src="https://i.imgur.com/I4smiGB.png" /></button>
        </form>
    )
}