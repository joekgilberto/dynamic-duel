import "./SuperCard.css"

export default function SuperCard({ superhero }) {
    
    return (
        <section className="SuperCard">
            <img src={superhero.image.url}
            onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src=require("../../assets/image-not-found.png");
              }}
            alt={superhero.name} />
            <p>{superhero.name}</p>
        </section>
    )
}