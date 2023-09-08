import "./Main.css"

import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from "react"

import SearchBar from "../SearchBar/SearchBar"
import Home from "../../pages/Home/Home"
import Auth from "../../pages/Auth/Auth"
import ShowHero from "../../pages/ShowHero/ShowHero"
import SearchHero from "../../pages/SearchHero/SearchHero"
import IndexBattle from "../../pages/IndexBattle/IndexBattle"
import NewBattle from "../../pages/NewBattle/NewBattle"
import ShowBattle from "../../pages/ShowBattle/ShowBattle"
import EditBattle from "../../pages/EditBattle/EditBattle"
import Error from "../../pages/Error/Error"

export default function Main() {
    const [updatedSearch, setUpdatedSearch] = useState('')
    const [searched, setSearched] = useState(false)

    return (
        <main>
            <SearchBar updatedSearch={updatedSearch} setUpdatedSearch={setUpdatedSearch} setSearched={setSearched} />
            <Routes>
                <Route path="/" element={<Home setUpdatedSearch={setUpdatedSearch} />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/heroes/:id" element={<ShowHero setUpdatedSearch={setUpdatedSearch} />} />
                <Route path="/heroes/search/:id" element={<SearchHero setUpdatedSearch={setUpdatedSearch} searched={searched} setSearched={setSearched} />} />
                <Route path="/battles" element={<IndexBattle setUpdatedSearch={setUpdatedSearch} />} />
                <Route path="/battles/new" element={<NewBattle setUpdatedSearch={setUpdatedSearch} />} />
                <Route path="/battles/:id" element={<ShowBattle setUpdatedSearch={setUpdatedSearch} />} />
                <Route path="/battles/:id/edit" element={<EditBattle setUpdatedSearch={setUpdatedSearch} />} />
                <Route path="/*" element={<Error setUpdatedSearch={setUpdatedSearch} />} />
            </Routes>
        </main>
    )
}