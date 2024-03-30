
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import { addFav, removeFav } from "../../redux/actions";

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
  userId
}) => {
  const dispatch = useDispatch();
  //const favorites = useSelector((state)=> state.myFavorites) otra forma
  const myFavorites = useSelector((state) => state.allCharacters);
  const { pathname } = useLocation();
  const [isFav, setIsFav] = useState(false);

  const handleFavorite = () => {
    // isFAv? dispatch(removeFav(id)): dispatch(addFav());
    //setIsFAv(!isFAv); esta es otra forma;
    if (isFav) {
      setIsFav(false);
      // dispatch(removeFav(id));
    } else {
      setIsFav(true);
      // dispatch(
      //   addFav({ id, name, status, species, gender, origin, image, onClose }, userId)
      // );
    }
  };

  useEffect(() => {
    myFavorites?.forEach((fav) => {
      if (fav.id === id) {
        setIsFav(true);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myFavorites]);

  return (
    <div className={styles.cartas}>
      <div className={styles.card}>
        {pathname !== "/favorites" ? (
          <button onClick={() => onClose(id)} className={styles.btnClose}>
            <span>X</span>
          </button>
        ) : (
          ""
        )}
        <div>
          <img src={image} alt="`${name}`" className={styles.imagen} />
          {isFav ? (
            <button onClick={handleFavorite} className={styles.addFav}>
              ❤️
            </button>
          ) : (
            <button onClick={handleFavorite} className={styles.addFav}>
              🤍
            </button>
          )}
        </div>
        <Link to={`/detail/${id}`}>
          <h2>{name}</h2>
        </Link>
        {/* <h2>Status: {status}</h2>
      <h2>Especie: {species}</h2>
      <h2>Género: {gender}</h2>
      <h2>Origen: {origin}</h2> */}
      </div>
    </div>
  );
};

export default Card;
