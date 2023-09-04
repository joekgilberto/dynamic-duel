import "./Main.css"

import {Routes, Route} from 'react-router-dom'

import SearchBar from "../SearchBar/SearchBar"
import Home from "../../pages/Home/Home"
import ShowHero from "../../pages/ShowHero/ShowHero"
import Error from "../../pages/Error/Error"

export default function Main(){
    return(
        <main>
            <SearchBar />
            <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/heroes/:id" element={<ShowHero />}/>
            <Route path="/*" element={<Error />}/>
        </Routes>
        </main>
    )
}