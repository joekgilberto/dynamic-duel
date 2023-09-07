import "./NewBattle.css"
import { useNavigate } from "react-router";
import { useEffect, useState } from "react"
import { createBattle } from "../../utilities/battle-services";

import NewBattleForm from "./NewBattleForm";

const initState = {
    winner: "Draw",
    details: ""
}

export default function NewBattle({ setUpdatedSearch }) {

    const navigate = useNavigate()

    const [superOne, setSuperOne] = useState(null)
    const [superTwo, setSuperTwo] = useState(null)
    const [formData, setFormData] = useState(initState);

    useEffect(() => {
        setUpdatedSearch('');
    }, []);

    function handleChange(e) {
        console.log("name", e.target.name)
        console.log("value", e.target.value)
        const updatedData = { ...formData, [e.target.name]: e.target.value }
        console.log("updatedData", updatedData)
        setFormData(updatedData)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const dataToSend = {
                ...formData,
                superOneId: superOne.id,
                superTwoId: superTwo.id,
                superOneName: superOne.name,
                superTwoName: superTwo.name,
                superOneImage: superOne.image.url,
                superTwoImage: superTwo.image.url,
            }
            console.log(dataToSend)
            await createBattle(dataToSend)
            setFormData(initState)
            navigate("/battles")
        } catch (error) {
            navigate("/battles/new")
            console.log(error)
        }
    }

    return (
        <section className="NewBattle">
            <NewBattleForm whichOne={"first"} thisSuper={superOne} setThisSuper={setSuperOne} />
            <form className="final-submit" onSubmit={handleSubmit}>
                <h1>VS</h1>
                {superOne && superTwo ? (
                    <>
                        <label>Winner
                            <select name="winner" onChange={handleChange} required>
                                <option>Draw</option>
                                <option>{superOne.name}</option>
                                <option>{superTwo.name}</option>
                            </select>
                        </label>
                        <label>Details
                            <input name="details" type="text" onChange={handleChange} placeholder="Optional" />
                        </label>
                        <button type="submit">Post</button>
                    </>

                ) : null}

            </form>
            <NewBattleForm whichOne={"second"} thisSuper={superTwo} setThisSuper={setSuperTwo} />
        </section>
    )
}