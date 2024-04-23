import { useState } from "react";

import axios from "axios";

import validation from "../utils/validation.js";
import styles from "../components/Form/Form.module.css";

import "boxicons";

const RegistrationForm = () => {
  const [errors, setErrors] = useState({});
  const [formMessage, setFormMessage ] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [formError, setFormError] = useState("");

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    repeatPassword:""
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isEmpty = Object.values(userData).some(
      (value) => value.trim() === ""
    );

    if (isEmpty) {
      setFormError("Por favor, completa todos los campos.");
      return;
    } else setFormError("")

    if (Object.keys(errors).length === 0) {

      try {
        const endpoint = `/users`;
        const { data } = await axios.post(endpoint, {
          email: userData.email,
          password: userData.password,
        });
        if (data.success) {
          setFormMessage(data.message);
          setUserData({
            email: "",
            password: "",
            repeatPassword: "",
          });
          setFormError("");
        }
      } catch (error) {
        if (error.response) {
          console.error(
            "Respuesta de error del servidor:",
            error.response.data
          );
          setFormError(error.response.data.error);
          setFormMessage("");
        } else {
          console.error("Error:", error.message);
        }
      }
    } else {
        setFormError(
            "Por favor, completar correctamente los campos."
        );
        setFormMessage("");
    }
  };
  return (
    <form className={styles.form}>
      <div className={styles.inputbox}>
        <label>
          <h4>Correo Electrónico:</h4>
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
        <label>
          <h4>Repetir Contraseña:</h4>
        </label>
        <>
          <input
            type={showRePassword ? "text" : "password"}
            name="repeatPassword"
            id="RePassword"
            value={userData.repeatPassword}
            onChange={handleChange}
            placeholder="Ingresa nuevamente tu contraseña."
          />
          <div
            className={styles.showPasswordIcon}
            onClick={() => setShowRePassword((prev) => !prev)}>
            {showRePassword ? (
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
        {errors.repeatPassword ? (
          <p className={styles.errors}>{errors.repeatPassword}</p>
        ) : (
          <p className={styles.errors}>{errors.repeatPassword}</p>
        )}
      </div>
      <div className={styles.inputbox}>
        {/* <button type="submit">Submit</button> */}
        <input type="submit" value="Registrarse" onClick={handleSubmit} />
        <div className={styles.formMessage}>
          {formError && <p className={styles.errors}>{formError}</p>}
          {formMessage && <p className={styles.message}>{formMessage}</p>}
        </div>
      </div>
    </form>
  );
};

export default RegistrationForm;
