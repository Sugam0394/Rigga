import "./AboutCard.css";

const AboutCard = ({
  bio,
}) => {
  return (
    <section className="about-card">

      <h2>
        About
      </h2>

      <p className="about-card__bio">
        {bio?.trim()
          ? bio
          : "No bio added yet. Tell others a little about yourself."}
      </p>

    </section>
  );
};

export default AboutCard;