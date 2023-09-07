export default function BattleCardImage({ superImage, superName }) {
    return(
    <div>
        <img src={superImage} alt={superName} onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = require("../../assets/image-not-found.png");
            currentTarget.className = "contain";
        }} />
        <h2>{superName}</h2>
    </div>
    )
}