import "./HeroCard.css"

import * as tools from "../../utilities/tools"

export default function HeroCard({ hero, fav }) {
    
    return (
        <section className={fav?"HeroCard favorite-hero":"HeroCard"}>
            <img src={hero.image.url}
            onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src=require("../../assets/image-not-found.png");
              }}
            alt={hero.name} />
            <p>{hero.name}</p>
        </section>
    )
}