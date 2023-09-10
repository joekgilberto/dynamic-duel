import "./Error.css"
import { useEffect } from "react"
import { Link } from "react-router-dom"

export default function Error({ setUpdatedSearch }) {
    useEffect(() => {
        setUpdatedSearch('')
    }, [])
    return (
        <section className="Error">
            <h1 className="headline">Error 404</h1>
            <h2>It's a bird, it's a plane... it's a page not found!</h2>
            <Link to="/">
                <p>Click here to return home</p>
            </Link>
        </section>
    )
}