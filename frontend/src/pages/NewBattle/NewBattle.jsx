import "./NewBattle.css"
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react"
import { createBattle } from "../../utilities/battle-services";

import NewBattleForm from "../../components/NewBattleForm/NewBattleForm";

const initState = {
    winner: "Draw",
    details: ""
}

export default function NewBattle({ setUpdatedSearch }) {

    const navigate = useNavigate()
    const { id } = useParams()
    if (id > 732){
        navigate('/404')
    }
    const [theId, setTheId] = useState(id)
    

    const [superOne, setSuperOne] = useState(null)
    const [superTwo, setSuperTwo] = useState(null)
    const [formData, setFormData] = useState(initState);

    useEffect(() => {
        setUpdatedSearch('');
    }, []);

    function handleChange(e) {
        const updatedData = { ...formData, [e.target.name]: e.target.value }
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
            const battleData = await createBattle(dataToSend)
            setFormData(initState)
            navigate("/battles")
        } catch (error) {
            navigate("/battles/new")
            console.log(error)
        }
    }

    return (
        <section className="NewBattle">
            <h1 className="headline">Pick A Fight!</h1>
            <div className="pick-a-fight">
                <NewBattleForm whichOne={"first"} thisSuper={superOne} setThisSuper={setSuperOne} id={theId} setId={setTheId} />
                <form className="final-submit" onSubmit={handleSubmit}>
                    {superOne && superTwo ? (
                        <div className="battle-finalizations">
                            <h1 className="vs">VS</h1>
                            <label className="winner">Winner
                                <select name="winner" onChange={handleChange} required>
                                    <option>Draw</option>
                                    <option>{superOne.name}</option>
                                    <option>{superTwo.name}</option>
                                </select>
                            </label>
                            <label className="details">Details
                                <textarea name="details" onChange={handleChange} placeholder="Optional" />
                            </label>
                            <button className="post" type="submit">Post</button>
                        </div>

                    ) : (
                        <div className="battle-finalizations no-picks-yet">
                            <h1 className="vs">VS</h1>
                        </div>
                    )}

                </form>
                <NewBattleForm whichOne={"second"} thisSuper={superTwo} setThisSuper={setSuperTwo} />
            </div>
        </section>
    )
}