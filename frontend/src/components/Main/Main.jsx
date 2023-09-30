import "./Main.css"

import { Routes, Route } from 'react-router-dom'
import { useState } from "react"

import PrivateRoute from "../PrivateRoute/PrivateRoute"
import SearchBar from "../SearchBar/SearchBar"
import Home from "../../pages/Home/Home"
import Auth from "../../pages/Auth/Auth"
import ShowSuper from "../../pages/ShowSuper/ShowSuper"
import SearchSuper from "../../pages/SearchSuper/SearchSuper"
import IndexBattle from "../../pages/IndexBattle/IndexBattle"
import NewBattle from "../../pages/NewBattle/NewBattle"
import ShowBattle from "../../pages/ShowBattle/ShowBattle"
import EditBattle from "../../pages/EditBattle/EditBattle"
import User from "../../pages/User/User"
import OtherUser from "../../pages/OtherUser/OtherUser"
import Error from "../../pages/Error/Error"
import Footer from "../Footer/Footer"

export default function Main() {
    const [updatedSearch, setUpdatedSearch] = useState('')
    const [searched, setSearched] = useState(false)

    return (
        <main>
            <div className="main-content">
            <SearchBar updatedSearch={updatedSearch} setUpdatedSearch={setUpdatedSearch} setSearched={setSearched} />
            <Routes>
                <Route path="/" element={<Home setUpdatedSearch={setUpdatedSearch} />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/supers/:id" element={<ShowSuper setUpdatedSearch={setUpdatedSearch} />} />
                <Route path="/supers/search/:id" element={<SearchSuper setUpdatedSearch={setUpdatedSearch} searched={searched} setSearched={setSearched} />} />
                <Route path="/battles" element={<IndexBattle setUpdatedSearch={setUpdatedSearch} />} />
                <Route
                    path="/battles/new/:id"
                    element={
                        <PrivateRoute>
                            <NewBattle setUpdatedSearch={setUpdatedSearch} />
                        </PrivateRoute>
                    }
                />
                <Route path="/battles/:id" element={<ShowBattle setUpdatedSearch={setUpdatedSearch} />} />
                <Route
                    path="/battles/:id/edit"
                    element={
                        <PrivateRoute>
                            <EditBattle setUpdatedSearch={setUpdatedSearch} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/user"
                    element={
                        <PrivateRoute>
                            <User setUpdatedSearch={setUpdatedSearch} />
                        </PrivateRoute>
                    }
                />

                <Route path="/user/:id" element={<OtherUser setUpdatedSearch={setUpdatedSearch} />} />
                <Route path={"/*"} element={<Error setUpdatedSearch={setUpdatedSearch} />} />
            </Routes>
            </div>
            <Footer />
        </main >
    )
}