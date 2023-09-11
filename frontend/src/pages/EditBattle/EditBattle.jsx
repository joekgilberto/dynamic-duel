import "./EditBattle.css"

import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getBattle, editBattle, deleteBattle } from "../../utilities/battle-services"
import { deleteAllLikes } from "../../utilities/likes-services"
import { deleteAllComments } from "../../utilities/comments-services"

import Loading from "../../components/Loading/Loading"
import BattleChampion from "../../components/BattleChampion/BattleChampion"

export default function EditBattle({ setUpdatedSearch }) {

    const navigate = useNavigate()

    const { id } = useParams()

    const [battle, setBattle] = useState(null)
    const [editFormData, setEditFormData] = useState(null);


    async function handleRequest() {
        try {
            const battleData = await getBattle(id)
            setBattle(battleData)
            setEditFormData({ ...battleData, winner: "Draw" })
        } catch (err) {
            console.log(err)
        }
    }

    function handleChange(e) {
        const updatedData = { ...editFormData, [e.target.name]: e.target.value }
        setEditFormData(updatedData)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const battleData = await editBattle(battle._id, editFormData)
            navigate(`/battles/${battle._id}`)
        } catch (error) {
            navigate(`/battles/${battle._id}/edit`)
            console.log(error)
        }
    }

    async function handleDelete(e) {
        try {
            const deletedBattle = await deleteBattle(battle._id)
            const deletedLikes = await deleteAllLikes(battle.likes)
            const deletedComments = await deleteAllComments(battle.comments)
            navigate('/battles')
        } catch (err) {
            console.log(err)
            navigate(`/battles/${battle._id}`)
        }
    }


    useEffect(() => {
        setUpdatedSearch('')
        handleRequest()
    }, [])

    return (
        <section className="EditBattle">
            {battle ? (
                <form onSubmit={handleSubmit}>
                    <div className="edit-outcome">
                        <h2>Outcome</h2>
                        <select name="winner" onChange={handleChange}>
                            <option>Draw</option>
                            <option>{battle.superOneName}</option>
                            <option>{battle.superTwoName}</option>
                        </select>
                    </div>
                    <div className="whole-battle">
                        <BattleChampion image={battle.superOneImage} name={battle.superOneName} />

                        <div className="edit-battle-vs">
                            <h2 className="vs">VS</h2>
                        </div>

                        <BattleChampion image={battle.superTwoImage} name={battle.superTwoName} />

                    </div>
                    <div className="edit-battle-details">
                        <h3>Details:</h3>
                        <textarea name="details" onChange={handleChange} placeholder="Optional" value={editFormData.details} />
                    </div>
                    <div className="save-or-destroy">
                        <button type="submit" className="edit-battle-save">Save</button>
                        <p className="edit-battle-delete" onClick={handleDelete}>Delete</p>
                    </div>
                </form>
            ) :
                <Loading />}
        </section>
    )
}