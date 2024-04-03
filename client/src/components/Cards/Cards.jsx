import PropTypes from "prop-types";
import Card from "../Card/Card.jsx";

import styles from "./Cards.module.css";

const Cards = ({ characters, onClose, userId }) => {
  return (
    <div className={styles.backgroundImg}>
      {characters.map((personaje) => {
        return (
          <Card
            key={personaje.id}
            id={personaje.id}
            name={personaje.name}
            status={personaje.status}
            species={personaje.species}
            gender={personaje.gender}
            origin={personaje.origin.name}
            image={personaje.image}
            onClose={() => onClose(personaje.id)}
            userId={userId}
          />
        );
      })}
    </div>
  );
};

Cards.propTypes = {
  characters: PropTypes.array,
  onClose: PropTypes.func,
  userId: PropTypes.number,
};

export default Cards;
