import "./NewBattle.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import { searchString } from "../../utilities/tools";

import SelectSuper from "./SelectSuper";

export default function NewBattle({ setUpdatedSearch }) {

    const navigate = useNavigate()

    //TODO setUpdatedSearch
    useEffect(() => {
        setUpdatedSearch('');
    }, []);

    //Input while user is typing
    const [superOneTyping, setSuperOneTyping] = useState('')
    const [superTwoTyping, setSuperTwoTyping] = useState('')

    //Term used to search
    const [superOneSearched, setSuperOneSearched] = useState('')
    const [superTwoSearched, setSuperTwoSearched] = useState('')

    //Selected super from search
    const [superOne, setSuperOne] = useState(null)
    const [superTwo, setSuperTwo] = useState(null)

    //Triggers refresh of search results
    const [battleSearchedOne, setBattleSearchedOne] = useState(false)
    const [battleSearchedTwo, setBattleSearchedTwo] = useState(false)


    function handleFirstChange(e) {
        setSuperOneTyping(e.target.value)
    }

    function handleSecondChange(e) {
        setSuperTwoTyping(e.target.value)
    }

    async function handleFirstSubmit(e) {
        e.preventDefault()
        try {
            setSuperOneSearched(searchString(superOneTyping))
            setBattleSearchedOne(true)
        } catch (error) {
            console.log(error)
        }
    }

    async function handleSecondSubmit(e) {
        e.preventDefault()
        try {
            setSuperTwoSearched(searchString(superTwoTyping))
            setBattleSearchedTwo(true)
        } catch (error) {
            console.log(error)
        }
    }

    async function handleFinalSubmit(e) {
        e.preventDefault()
        try {
            navigate("/battles")
        } catch (error) {
            navigate("/battles/new")
            console.log(error)
        }
    }

    return (
        <section className="NewBattle">
            <form className="super-one" onSubmit={handleFirstSubmit}>
                <input type="text" placeholder="Search your first super.." onChange={handleFirstChange} value={superOneTyping} />
                <button type="submit">Find first super</button>
                <SelectSuper superSearched={superOneSearched} setSuper={setSuperOne} battleSearched={battleSearchedOne} setBattleSearched={setBattleSearchedOne} setSuperTyping={setSuperOneTyping} thisSuper={superOne} />
            </form>
            <form className="final-submit" onSubmit={handleFinalSubmit}>
                <h1>VS</h1>
                {superOne && superTwo ? (
                    <>
                    <label>Winner
                        <select required>
                            <option>{superOne.name}</option>
                            <option>{superTwo.name}</option>
                            <option>Draw</option>
                        </select>
                    </label>
                    <button type="submit">Post</button>
                    </>

                ) : null}

            </form>
            <form className="super-two" onSubmit={handleSecondSubmit}>
                <input type="text" placeholder="Search your second super.." onChange={handleSecondChange} value={superTwoTyping} />
                <button type="submit">Find second super</button>
                <SelectSuper superSearched={superTwoSearched} setSuper={setSuperTwo} battleSearched={battleSearchedTwo} setBattleSearched={setBattleSearchedTwo} setSuperTyping={setSuperTwoTyping} thisSuper={superTwo} />
            </form>
        </section>
    )
}