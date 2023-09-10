import "./Error.css"
import { useEffect } from "react"

export default function Error({ setUpdatedSearch }) {
    useEffect(() => {
        setUpdatedSearch('')
    }, [])
    return (
        <section className="Error">
            <h1 className="headline">Error 404</h1>
            <h2>It's a bird, it's a plane... it's a page not found!</h2>
        </section>
    )
}