import { useState } from "react";
import validation from "../utils/validation.js";

import styles from "../components/Form/Form.module.css";
import "boxicons";

const RegistrationForm = () => {
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const [formError, setFormError] = useState("");

    const [userData, setUserData] = useState({
        email: "",
        password: "",
        repeatPassword:""
    });

    const handleChange = (event) => {
        console.log(event.target.value)
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

        if (Object.keys(errors).length === 0) {
          // No hay errores, enviar el formulario
            // login(userData);
            setFormError("");
        } else {
            setFormError(
                "Por favor, completar correctamente los campos."
            );
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
          </div>
        </div>
      </form>
    );
};

export default RegistrationForm;
