/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { simpleAlert, SimpleDialogContainer } from 'react-simple-dialogs'
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import Nav from "./components/Nav/Nav";
import About from "./components/About/About";
import Form from "./components/Form/Form.jsx";
import Detail from "./components/Detail/Detail";
import Cards from "./components/Cards/Cards.jsx";
import Favorites from "./components/Favorites/Favorites";

import { useLocalStorage } from "././utils/useLocalStorage.js";
import { loginFailure, loginSuccess } from "./redux/actions.js";

import "./App.css";

const API_URL = "http://localhost:3001/rickandmorty";

function App() {
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [userIdStored, setUserIdStored] = useLocalStorage("userIdStored", 0);
  const [storedFavorites, setStoredFavorites] = useLocalStorage("storedFavorites", []);
  const [characters, setCharacters] = useLocalStorage("characters", []);
  const [access, setAccess] = useState(false);
  
  const loggedIn = useSelector((state) => state.loggedIn);
  const userId = useSelector((state) => state.userId);
  const repeatedCharacterAlert = () => simpleAlert( {message: "¡Este personaje ya se encuentra seleccionado, intenta otra vez!",
  closeLabel: 'Ok, ya puedes cerrar.',
  title: "Oops..."
})

  const noCharacterAlert = () =>
    simpleAlert({
      message: "¡No hay personajes con este ID!",
      closeLabel: "Mejor suerte la proxima vez.",
      title: "Que mal!",
    });

  useEffect(() => {
    const userId = userIdStored ? userIdStored : null;
    
    if (userId !== null && userId !== undefined) {
      const userFavorites = storedFavorites || [];
      dispatch(loginSuccess(userId, userFavorites));
      setAccess(true);
      if(pathname==="/") navigate("/home");
    } else if (!access && pathname !== "/") {
      navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access, pathname, navigate, dispatch, userIdStored]);

  
  const login = async (userData) => {
    try {
      const { data } = await axios.post(`${API_URL}/users/login`, userData);
      const { success, userId, userFavorites } = data;

      if (success) {
        dispatch(loginSuccess(userId, userFavorites)); 
        navigate("/home");
        setUserIdStored(userId);
        setStoredFavorites(userFavorites)
        setAccess(success);
      } else {
        dispatch(loginFailure("Inicio de sesión fallido"));
      }

    } catch (error) {
      console.error("Error de inicio de sesión:", error.message);
      dispatch(loginFailure("Error de inicio de sesión"));
    }
  };

  const [characterSet, setCharacterSet] = useState(new Set());

  useEffect(()=>{
    if(!loggedIn){
      setCharacterSet(new Set());
      setCharacters([]);
    }
  },[ loggedIn ]);

  const personajeRandom = () => {
    const randomId = Math.floor(Math.random() * 826) + 1;
    onSearch(randomId);
  };

  const onSearch = async (id) => {

    if (characterSet.has(id)) {
      repeatedCharacterAlert()
    } else {
      try {
    
        const { data } = await axios(`${API_URL}/characters/${id}`);

        if (data.name) {
          const updatedCharacters = [...characters, data];
          setCharacters(updatedCharacters);
          setCharacterSet(
            (prevCharacterSet) => new Set([...prevCharacterSet, id])
          );
        } else {
          // window.alert("¡No hay personajes con este ID!");
          noCharacterAlert();
        }
      } catch (error) {
        window.alert(error);
      }
    }
  };

  const onClose = (id) => {
    setCharacters((prevCharacters) =>
      prevCharacters.filter((character) => character.id !== id)
    );
  };

  const routeParts = pathname.split("/");

  return (
    <div className={`App ${routeParts[1]}`}>
      {pathname !== "/" && (
        <Nav
          onSearch={onSearch}
          personajeRandom={personajeRandom}
          setAccess={setAccess}
          setUserIdStored={setUserIdStored}
          setStoredFavorites={setStoredFavorites}
        />
      )}
      <SimpleDialogContainer
        primaryColor="#464b96"
        primaryHoverColor="#a3a5ea"
        color="#a3a5ea"
      />
      <Routes>
        <Route
          path="/"
          element={
            <Form
              login={login}
              setAccess={setAccess}
              setUserIdStored={setUserIdStored}
            />
          }
        />
        <Route
          path="/home"
          element={
            <Cards
              characters={characters}
              onClose={onClose}
              userId={userId}
              setStoredFavorites={setStoredFavorites}
            />
          }
        />
        <Route path="/detail/:id" element={<Detail />} />
        <Route
          path="/favorites"
          element={<Favorites setStoredFavorites={setStoredFavorites} />}
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
