import "./BattleCardImage.css"

export default function BattleCardImage({ superImage, superName, side }) {
    return(
    <div className={`BattleCardImage ${side}`}>
        <img src={superImage} alt={superName} onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = require("../../assets/image-not-found.png");
            currentTarget.className = "contain";
        }} />
        <h2>{superName}</h2>
    </div>
    )
}