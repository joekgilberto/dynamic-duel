import "./HeroCard.css"

export default function HeroCard({ hero }) {
    return (
        <section className="HeroCard">
                <img src={hero.image.url} alt={hero.name} />
                <p>{hero.name}</p>
        </section>
    )
}