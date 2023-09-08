import "./EditBattle.css"

import { useState, useEffect, useContext } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { UserContext } from "../../data"
import { getBattle } from "../../utilities/battle-services"

import Loading from "../../components/Loading/Loading"
import BattleChampion from "../../components/BattleChampion/BattleChampion"

export default function EditBattle({ setUpdatedSearch }) {

    const navigate = useNavigate()
    const { id } = useParams()

    const [battle, setBattle] = useState(null)
    let isOwner

    const { user } = useContext(UserContext);

    if (user) {
        isOwner = battle?.owner?._id === user._id;
    } else {
        isOwner = false;
    }

    if (!isOwner) {
        navigate('/')
    }

    async function handleRequest() {
        try {
            const battleData = await getBattle(id)
            setBattle(battleData)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        setUpdatedSearch('')
        handleRequest()
    }, [])

    return (
        <section className="EditBattle">
            {battle ? (
                <form>
                    <div className="edit-outcome">
                        <h2>Outcome</h2>
                        <select>
                            <option>Draw</option>
                            <option>{battle.superOneName}</option>
                            <option>{battle.superTwoName}</option>
                        </select>
                    </div>
                    <div className="whole-battle">
                        <Link to={`/heroes/${battle.superOneId}`}>
                            <BattleChampion image={battle.superOneImage} name={battle.superOneName} />
                        </Link>

                        <div className="edit-battle-vs">
                            <h2 className="vs">VS</h2>
                        </div>

                        <Link to={`/heroes/${battle.superTwoId}`}>
                            <BattleChampion image={battle.superTwoImage} name={battle.superTwoName} />
                        </Link>

                    </div>
                    {battle.details ? (
                        <div className="edit-battle-details">
                            <h3>Details:</h3>
                            <textarea value={battle.details} />
                        </div>
                    ) : null}
                    {
                        isOwner ? (
                            <Link to={`/battle/${id}/edit`}>
                                <button className="edit-battle-save">Save</button>
                            </Link>
                        ) : null}
                </form>
            ) :
                <Loading />}
        </section>
    )
}