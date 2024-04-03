import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from './Detail.module.css'

const API_URL = "http://localhost:3001/rickandmorty";

const Detail= ()=>{
    const {id} = useParams();
    const [character, setCharacter] = useState({});

    useEffect(() => {
        axios(`${API_URL}/characters/${id}`).then(({ data }) => {
            if (data.name) {
                setCharacter(data);
            } else {
                window.alert("No hay personajes con ese ID");
            }
        });
        return setCharacter({});
    }, [id]);
    return (
        <div className={styles.detailContainer}>
            <div className={`${styles.contenedor} ${styles.backgroundImg}`}>
            <img src={character.image} alt={character.name} />
            <div className={styles.detalle}>
                <h1>
                <span className={styles.titulo}>Name: </span>
                <span className={styles.info}>
                    {character.name && character.name}
                </span>
                </h1>
                <h1>
                <span className={styles.titulo}>Status: </span>
                <span className={styles.info}>{character.status}</span>
                </h1>
                <h1>
                <span className={styles.titulo}>Species: </span>
                <span className={styles.info}>{character.species}</span>
                </h1>
                <h1>
                <span className={styles.titulo}>Gender: </span>
                <span className={styles.info}>{character.gender}</span>
                </h1>
                <h1>
                <span className={styles.titulo}>Origin: </span>
                <span className={styles.info}>
                    {character.origin?.name && character.origin?.name}
                </span>
                </h1>
            </div>
            </div>
        </div>
    );
};

export default Detail;