import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Cards from "../Cards/Cards";
import { orderCards,filterCards } from "../../redux/actions";

import styles from './Favorites.module.css';


const Favorites = ({ setStoredFavorites }) => {
  const myFavorites = useSelector((state) => state.allFavorites);

  const dispatch = useDispatch();
  const handleOrder = (event) => {
    dispatch(orderCards(event.target.value));
  };
  const handleFilter = (event) => {
    dispatch(filterCards(event.target.value));
  };
  return (
    <div>
      <div className={styles.contenedor}>
        <h5>Ordena tus personajes favoritos:</h5>
        <div className={styles.select}>
          <select name="order" id="order" onChange={handleOrder}>
            <option value="A">Ascendente</option>
            <option value="D">Descendente</option>
          </select>
        </div>
        <div className={styles.select}>
          <select name="filter" id="filter" onChange={handleFilter}>
            <option value="All">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Genderless">Genderless</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
      </div>
      <Cards characters={myFavorites} setStoredFavorites={setStoredFavorites} />
    </div>
  );
};

Favorites.propTypes = {
  setStoredFavorites: PropTypes.func,
};

export default Favorites;