import "./BattleChampion.css"

export default function BattleChampion({image,name}) {
    return (
        <div className="show-battle-info">
            <div className="show-battle-display">
                <img className="show-battle-image" src={image} alt={name} onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = require("../../assets/image-not-found.png");
                    currentTarget.className = "show-battle-image contain";
                }} />
                <h1>{name}</h1>
            </div>
        </div>
    )
}