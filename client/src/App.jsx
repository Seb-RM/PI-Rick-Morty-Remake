import { useEffect, useState } from "react";

import axios from "axios";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Form from "./components/Form/Form.jsx";
import Cards from "./components/Cards/Cards.jsx";
import Nav from "./components/Nav/Nav";
// import About from "./components/About/About";
// import Detail from "./components/Detail/Detail";
// import Favorites from "./components/Favorites/Favorites";

import "./App.css";

const API_URL = "http://localhost:3001/rickandmorty";

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

    const [characters, setCharacters] = useState([]);

    const [access, setAccess] = useState(true);

    const [userId, setUserId] = useState(0);


  useEffect(() => {
    if (!access && pathname !== "/") {
      navigate("/");
    }
  }, [access, pathname, navigate]);

  
  const login = async (userData) => {
    try {
      const { email, password } = userData;
      const { data } = await axios.get(`${API_URL}/login`, {
        params: { email, password },
      });

      const { access, userId } = data;
      setAccess(access);
      setUserId(userId);

      access && navigate("/home");

    } catch (error) {
      console.error("Error de inicio de sesión:", error.message);
    }
  };

  const [characterSet, setCharacterSet] = useState(new Set());

  const personajeRandom = () => {
    const randomId = Math.floor(Math.random() * 826) + 1;
    onSearch(randomId);
  };

  const onSearch = async (id) => {
    console.log(characterSet);
    if (characterSet.has(id)) {
      window.alert(
        "¡Este personaje ya se encuentra seleccionado, intenta otra vez!"
      );
    } else {
      try {
        const { data } = await axios(`${API_URL}/character/${id}`);

        if (data.name) {
          setCharacters((oldChars) => [...oldChars, data]);
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


  return (
    <div className={`App ${pathname.slice(1)}`}>
      {pathname !== "/" && (
        <Nav onSearch={onSearch} personajeRandom={personajeRandom} />
      )}

      <Routes>
        <Route path="/" element={<Form login={login} />} />
        <Route
          path="/home"
          element={
            <Cards characters={characters} onClose={onClose} userId={userId} />
          }
        />
        {/* <Route path="/favorites" element={<Favorites />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/detail/:id"
          element={<Detail characters={characters} />}
        /> */}
      </Routes>
    </div>
  );
}

export default App;
