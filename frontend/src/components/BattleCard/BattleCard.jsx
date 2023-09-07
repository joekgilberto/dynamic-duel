import "./BattleCard.css"

import BattleCardImage from "./BattleCardImage";

export default function BattleCard({battle}){
    return(
        <section className="BattleCard">
        
            <BattleCardImage superImage={battle.superOneImage} superName={battle.superOneName} />
            <h2>VS</h2>
            <BattleCardImage superImage={battle.superTwoImage} superName={battle.superTwoName} />
        </section>
    )
}