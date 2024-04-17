import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import validation from "../utils/validation.js";
import { loginGuestUser, loginSuccess } from "../redux/actions.js";
import { useLocalStorage } from "../utils/useLocalStorage.js";

import styles from "../components/Form/Form.module.css";

const LoginForm = ({ login, setAccess }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [userIdStored, setUserIdStored] = useLocalStorage("userIdStored", []);
  const [storedFavorites, setStoredFavorites] = useLocalStorage(
    "storedFavorites",
    []
  );

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setUserData({
    ...userData,
    [event.target.name]: event.target.value,
    });
    setErrors(
    validation({ ...userData, [event.target.name]: event.target.value })
    );
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    login(userData);
  };

  const handleGuestLogin = () => {
    dispatch(loginSuccess( 1, []));
    dispatch(loginGuestUser(true));
    navigate("/home");
    setUserIdStored(1);
    setStoredFavorites([]);
    setAccess(true);
  }

    return (
      <>
        <form className={styles.form}>
          <div className={styles.inputbox}>
            <label>
              <h4>Correo Electrónico</h4>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="Ingresa tu dirección de correo."
            />
            {/* <i>ejemplo@gmail.com</i> */}
            {errors.e1 ? (
              <p className={styles.errors}>{errors.e1}</p>
            ) : errors.e2 ? (
              <p className={styles.errors}>{errors.e2}</p>
            ) : (
              <p className={styles.errors}>{errors.e3}</p>
            )}
          </div>
          <div className={styles.inputbox}>
            <label>
              <h4>Contraseña:</h4>
            </label>
            <>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="Ingresa tu contraseña."
              />
              <div
                className={styles.showPasswordIcon}
                onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? (
                  <box-icon
                    name="show"
                    color="rgb(141, 225, 233)"
                    size="20px"
                    animation="flashing-hover"></box-icon>
                ) : (
                  <box-icon
                    name="hide"
                    color="rgb(141, 225, 233)"
                    size="20px"
                    animation="flashing-hover"></box-icon>
                )}
              </div>
            </>
            {/* <i>Password1</i> */}
            {errors.p1 ? (
              <p className={styles.errors}>{errors.p1}</p>
            ) : (
              <p className={styles.errors}>{errors.p2}</p>
            )}
          </div>
          <div className={styles.inputbox}>
            {/* <button type="submit">Submit</button> */}
            <input type="submit" value="Ingresar" onClick={handleSubmit} />
          </div>
          <div style={{ position: "relative" }}>
            <button
              className={styles.guestUserButton}
              onClick={() => handleGuestLogin()}>
              Ingresar como Invitado
            </button>
          </div>
        </form>
      </>
    );
};

LoginForm.propTypes = {
    login: PropTypes.func,
    setAccess: PropTypes.func,
};
export default LoginForm;
