/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocalStorage } from "././utils/useLocalStorage.js";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFailure } from "./redux/actions.js";

import axios from "axios";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Form from "./components/Form/Form.jsx";
import Cards from "./components/Cards/Cards.jsx";
import Nav from "./components/Nav/Nav";
import Detail from "./components/Detail/Detail";
import Favorites from "./components/Favorites/Favorites";
// import About from "./components/About/About";

import "./App.css";

const API_URL = "http://localhost:3001/rickandmorty";

function App() {
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [userIdStored, setUserIdStored] = useLocalStorage("userIdStored", []);
  const [storedFavorites, setStoredFavorites] = useLocalStorage("storedFavorites", []);
  const [characters, setCharacters] = useLocalStorage("characters", []);

  const [access, setAccess] = useState(false);

  const loggedIn = useSelector((state) => state.loggedIn);
  const userId = useSelector((state) => state.userId);

  useEffect(() => {
    const userId = userIdStored.length !==0 ? userIdStored : null;
    if (userId !== null && userId !== undefined) {
      const userFavorites = storedFavorites || [];
      dispatch(loginSuccess(userId, userFavorites));
      setAccess(true);
      if(pathname==="/") navigate("/home");
    } else if (!access && pathname !== "/") {
      navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access, pathname, navigate, dispatch]);

  
  const login = async (userData) => {
    try {
      const { data } = await axios.post(`${API_URL}/users/login`, userData);
      const { success, userId, userFavorites } = data;
      console.log(userFavorites)
      if (success) {
        dispatch(loginSuccess(userId, userFavorites)); 
        setUserIdStored(userId);
        setStoredFavorites(userFavorites)
        setAccess(success);
        navigate("/home");
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
      window.alert(
        "¡Este personaje ya se encuentra seleccionado, intenta otra vez!"
      );
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
          window.alert("¡No hay personajes con este ID!");
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
        <Nav onSearch={onSearch} personajeRandom={personajeRandom} setAccess={setAccess} />
      )}
      <Routes>
        <Route
          path="/"
          element={<Form login={login} setAccess={setAccess}/>}
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
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </div>
  );
}

export default App;
