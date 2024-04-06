import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./SearchBar.module.css"

export default function SearchBar({onSearch}) {
    console.log(onSearch)
    const [id, setId] = useState('');

    const handleChange = (event) => {
        setId(event.target.value);
    };

    return (
      <div className={styles.search}>
        <label>Hay 826 personajes!!</label>
        <input type="search" value={id} onChange={handleChange} placeholder="Ingresa un número para descubrirlos." id="numero_de_personaje"/>
        <button onClick={() => onSearch(id)}>Agregar</button>
      </div>
    );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func,
};