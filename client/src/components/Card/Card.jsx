import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addFav, removeFav } from "../../redux/actions";

import styles from "./Card.module.css";

const Card = ({
  id,
  name,
  status,
  species,
  gender,
  origin,
  image,
  onClose,
  setStoredFavorites,
}) => {
  const dispatch = useDispatch();
  //const favorites = useSelector((state)=> state.myFavorites) otra forma
  const myFavorites = useSelector((state) => state.allFavorites);
  console.log(myFavorites)
  const userId = useSelector((state) => state.userId);

  const { pathname } = useLocation();
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    myFavorites?.forEach((fav) => {
      if (fav.id === id) {
        setIsFav(true);
      }
    });
    setStoredFavorites(myFavorites);
  }, [myFavorites, id, setStoredFavorites]);

  const handleFavorite = () => {
    if (isFav) {
      setIsFav(false);
      dispatch(removeFav(id));
    } else {
      setIsFav(true);
      dispatch(
        addFav(
          { id, name, status, species, gender, origin, image, onClose },
          userId
        )
      );
    }
  };

  return (
    <div className={styles.card}>
      {pathname !== "/favorites" ? (
        <button onClick={() => onClose(id)} className={styles.btnClose}>
          <span>X</span>
        </button>
      ) : (
        ""
      )}
      <div className={styles.cardImgContainer}>
        <img
          src={image}
          alt="`${name}`"
          className={styles.imagen}
          loading="lazy"
        />
        {isFav ? (
          <button onClick={() => handleFavorite()} className={styles.addFav}>
            ❤️
          </button>
        ) : (
          <button onClick={() => handleFavorite()} className={styles.addFav}>
            🤍
          </button>
        )}
      </div>
      <Link to={`/detail/${id}`}>
        <h2>{name}</h2>
      </Link>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  status: PropTypes.string,
  species: PropTypes.string,
  gender: PropTypes.string,
  origin: PropTypes.string,
  image: PropTypes.string,
  onClose: PropTypes.func,
  setStoredFavorites: PropTypes.func,
};

export default Card;
