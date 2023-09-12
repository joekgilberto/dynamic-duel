import "./FavCard.css"

export default function SuperCard({ superhero }) {

    return (
        <section className="FavCard">
            <img src={superhero.image.url}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = require("../../assets/image-not-found.png");
                }}
                alt={superhero.name} />
            <div className="fav-name">
                <img className="star" src={require('../../assets/favorite.png')} />
                <p>{superhero.name}</p>
                <img className="star" src={require('../../assets/favorite.png')} />
            </div>
        </section>
    )
}