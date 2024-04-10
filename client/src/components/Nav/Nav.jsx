import PropTypes from "prop-types";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";

import { logout } from "../../redux/actions"

import styles from "./Nav.module.css";
import logo from "../../assets/img/logo.png";

const Nav = ({ onSearch, personajeRandom }) => {

  const location = useLocation();
  const isHomePage = location.pathname === "/home";
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {

    dispatch(logout());
    localStorage.clear();
    navigate("/");
    console.log("Usuario desconectado");
  }
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
          <div className={styles.exitContainer} onClick={()=>handleLogout()}>
            <box-icon
              name="exit"
              color="rgb(218, 172, 74)"
              size="25px"
              animation="flashing-hover"
              ></box-icon>
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
};

export default Nav;
