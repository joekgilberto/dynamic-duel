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

    return (
        <form className="NewBattleForm" onSubmit={handleSubmit}>
            {!thisSuper ? (
                <>
                    <input type="text" placeholder={`Search your ${whichOne} super...`} onChange={handleChange} value={superTyping} />
                    <button type="submit">Find {whichOne} super</button>
                </>
            ) : null}
            <SelectSuper superSearched={superSearched} setSuper={setThisSuper} battleSearched={battleSearched} setBattleSearched={setBattleSearched} setSuperTyping={setSuperTyping} thisSuper={thisSuper} />
        </form>
    )
}