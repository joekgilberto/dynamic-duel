import "./BattleCard.css"

import BattleCardImage from "./BattleCardImage";

export default function BattleCard({ battle }) {
    return (
        <section className="BattleCard">
            <h2 className="vs">VS</h2>
            <div className="underneath">
                <BattleCardImage superImage={battle.superOneImage} superName={battle.superOneName} />
                <BattleCardImage superImage={battle.superTwoImage} superName={battle.superTwoName} />
            </div>
        </section>
    )
}