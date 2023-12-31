import "./NewBattleForm.css"

import { useState } from "react"

import SelectSuper from "./SelectSuper";

export default function NewBattleForm({ whichOne, thisSuper, setThisSuper, id, setId }) {

    const [superTyping, setSuperTyping] = useState('')
    const [superSearched, setSuperSearched] = useState('')
    const [battleSearched, setBattleSearched] = useState(false)

    function handleChange(e) {
        setSuperTyping(e.target.value)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setSuperSearched(encodeURIComponent(superTyping))
            setBattleSearched(true)
        } catch (error) {
            console.log(error)
        }
    }

    async function handleReset(e){
        if((id >= 1 && id  <= 732)||!id){
            setThisSuper(null)
            setSuperTyping('')
            setSuperSearched('')
            setBattleSearched(false)
            setId(0)
        } else {
            setId(0)
        }
    }

    return (
        <form className="NewBattleForm" onSubmit={handleSubmit}>
            {!thisSuper ? (
                <div className="new-battle-search-bar">
                    <input className="new-battle-search" type="text" placeholder={`Search your ${whichOne} super...`} onChange={handleChange} value={superTyping} />
                    <button className="new-battle-search-button" type="submit">Find {whichOne} super</button>
                </div>
            ) : null}
            <SelectSuper superSearched={superSearched} setSuper={setThisSuper} battleSearched={battleSearched} setBattleSearched={setBattleSearched} setSuperTyping={setSuperTyping} thisSuper={thisSuper} id={id} />
            {thisSuper? <button className="change-super" onClick={handleReset}>Change Super</button>:null}
        </form>
    )
}