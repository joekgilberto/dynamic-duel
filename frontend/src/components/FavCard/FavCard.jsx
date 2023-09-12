import "./FavCard.css"

export default function HeroCard({ hero }) {

    return (
        <section className="FavCard">
            <img src={hero.image.url}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = require("../../assets/image-not-found.png");
                }}
                alt={hero.name} />
            <div className="fav-name">
                <img className="star" src={require('../../assets/favorite.png')} />
                <p>{hero.name}</p>
                <img className="star" src={require('../../assets/favorite.png')} />
            </div>
        </section>
    )
}