import "./NewBattleForm.css"

import { useState } from "react"
import { searchString } from "../../utilities/tools";

import SelectSuper from "./SelectSuper";

export default function NewBattleForm({ whichOne, thisSuper, setThisSuper }) {

    const [superTyping, setSuperTyping] = useState('')
    const [superSearched, setSuperSearched] = useState('')
    const [battleSearched, setBattleSearched] = useState(false)

    function handleChange(e) {
        setSuperTyping(e.target.value)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setSuperSearched(searchString(superTyping))
            setBattleSearched(true)
        } catch (error) {
            console.log(error)
        }
    }

    async function handleReset(e){
        setThisSuper(null)
        setSuperTyping('')
        setSuperSearched('')
        setBattleSearched(false)
    }

    return (
        <form className="NewBattleForm" onSubmit={handleSubmit}>
            {!thisSuper ? (
                <div className="new-battle-search-bar">
                    <input className="new-battle-search" type="text" placeholder={`Search your ${whichOne} super...`} onChange={handleChange} value={superTyping} />
                    <button className="new-battle-search-button" type="submit">Find {whichOne} super</button>
                </div>
            ) : null}
            <SelectSuper superSearched={superSearched} setSuper={setThisSuper} battleSearched={battleSearched} setBattleSearched={setBattleSearched} setSuperTyping={setSuperTyping} thisSuper={thisSuper} />
            {thisSuper? <button className="change-super" onClick={handleReset}>Change Super</button>:null}
        </form>
    )
}