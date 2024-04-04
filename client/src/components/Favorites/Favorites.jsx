import { useSelector, useDispatch } from "react-redux";
import Cards from "../Cards/Cards";
import { orderCards,filterCards } from "../../redux/actions";

import styles from './Favorites.module.css';


const Favorites = () => {

    //const {myFavorites} = useSelector((state)=>state);
    const myFavorites = useSelector((state)=> state.myFavorites);
    // otra forma seria usando map: myFavorites.map((props)=> return Card)
    const dispatch = useDispatch();
    const handleOrder = (event)=> {
        dispatch(orderCards(event.target.value))
    }
    const handleFilter = (event)=>{
        dispatch(filterCards(event.target.value));
    }
    return (
      <div>
        <div className={styles.contenedor}>
          <h5>Ordena tus personajes favoritos:</h5>
          <div className={styles.select}>
            <select name="order" id="order" onChange={handleOrder}>
              <option value="A">Ascendent</option>
              <option value="D">Descendent</option>
              <option></option>
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
        <Cards characters={myFavorites} />
      </div>
    );
};

export default Favorites;