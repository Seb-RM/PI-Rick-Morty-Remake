import PropTypes from "prop-types";

import styles from "./Cards.module.css";

const Cards = ({ characters, onClose, userId }) => {
  return (
    <div className={styles.backgroundImg}>
      <h1>Cards</h1>
    </div>
  );
};

Cards.propTypes = {
  characters: PropTypes.array,
  onClose: PropTypes.func,
  userId: PropTypes.number,
};

export default Cards;
