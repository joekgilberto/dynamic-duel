import "./Main.css"

import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from "react"

import SearchBar from "../SearchBar/SearchBar"
import Home from "../../pages/Home/Home"
import ShowHero from "../../pages/ShowHero/ShowHero"
import SearchHero from "../../pages/SearchHero/SearchHero"
import Error from "../../pages/Error/Error"

export default function Main() {
    const [updatedSearch, setUpdatedSearch] = useState('')

    return (
        <main>
            <SearchBar updatedSearch={updatedSearch} setUpdatedSearch={setUpdatedSearch} />
            <Routes>
                <Route path="/" element={<Home setUpdatedSearch={setUpdatedSearch} />} />
                <Route path="/heroes/:id" element={<ShowHero setUpdatedSearch={setUpdatedSearch} />} />
                <Route path="heroes/search/:id" element={<SearchHero setUpdatedSearch={setUpdatedSearch} />} />
                <Route path="/*" element={<Error setUpdatedSearch={setUpdatedSearch} />} />
            </Routes>
        </main>
    )
}