import "./Error.css"
import { useEffect } from "react"

export default function Error({setUpdatedSearch}){
    useEffect(()=>{
        setUpdatedSearch('')
    },[])
    return(
        <section className="Error">
            <h3>Error</h3>
        </section>
    )
}