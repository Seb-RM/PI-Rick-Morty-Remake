import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import styles from "./Nav.module.css";
import { logout } from "../../redux/actions"
import logo from "../../assets/img/logo.png";
import SearchBar from "../SearchBar/SearchBar";

const Nav = ({
  onSearch,
  personajeRandom,
  setAccess,
  setUserIdStored,
  setStoredFavorites,
}) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    setUserIdStored(0);
    setStoredFavorites([]);
    localStorage.clear();
    dispatch(logout());
    navigate("/");
    setAccess(false);
    console.log("Usuario desconectado");
  };
  return (
    <div className={styles.navBar}>
      <div className={styles.contenedorUno}>
        <div className={styles.contenedorLogo}>
          <h1>Rick And Morty - App</h1>
          <img src={logo} className={styles.logo} />
        </div>
        <div className={styles.navLinks}>
          <NavLink
            to="home"
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }>
            <button className={styles.btn1}>Home</button>
          </NavLink>
          <NavLink
            to="favorites"
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }>
            <button className={styles.btn1}>Favorites</button>
          </NavLink>
          <NavLink
            to="about"
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }>
            <button className={styles.btn1}>About</button>
          </NavLink>
          <div className={styles.exitContainer} onClick={() => handleLogout()}>
            <box-icon
              name="exit"
              color="rgb(218, 172, 74)"
              size="25px"
              animation="flashing-hover"></box-icon>
          </div>
        </div>
      </div>
      {isHomePage && (
        <div className={styles.contenedorDos}>
          <SearchBar onSearch={onSearch} onClick={personajeRandom} />
          <div>
            <label>Sí prefieres,también puedes.</label>
            <button onClick={personajeRandom}>
              Agregar un Personaje Aleatorio!!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

Nav.propTypes = {
  onSearch: PropTypes.func,
  personajeRandom: PropTypes.func,
  setAccess: PropTypes.func,
  setUserIdStored: PropTypes.func,
  setStoredFavorites: PropTypes.func,
};

export default Nav;
