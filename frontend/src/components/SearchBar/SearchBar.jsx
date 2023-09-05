import "./SearchBar.css"

import { useState } from "react";
import { useNavigate } from "react-router";
import { searchString } from "../../utilities/tools";

export default function SearchBar({updatedSearch, setUpdatedSearch,setSearched}){

    const navigate = useNavigate()

    function handleChange(e){
        setUpdatedSearch(e.target.value)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setSearched(true)
            navigate(`/heroes/search/${searchString(updatedSearch)}`)
            setUpdatedSearch('')
        } catch (error) {
            navigate(`/`)
            setUpdatedSearch('')
        }
    }

    return(
        <form className="SearchBar" onSubmit={handleSubmit}>
              <input className="search-input" type="text" placeholder="Search a super.." onChange={handleChange} value={updatedSearch} />
              <button className="search-button" type="submit"><img className="magnifying-glass" src={require("../../assets/search.png")} /></button>
        </form>
    )
}