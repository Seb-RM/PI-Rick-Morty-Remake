import { useState } from "react";
import validation from "../utils/validation.js";

import styles from "../components/Form/Form.module.css";

const RegistrationForm = () => {
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

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
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={userData.password}
                    onChange={handleChange}
                    placeholder="Ingresa tu contraseña."
                />
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
                <input
                    type={showPassword ? "text" : "password"}
                    name="RePassword"
                    id="RePassword"
                    value={userData.password}
                    onChange={handleChange}
                    placeholder="Ingresa nuevamente tu contraseña."
                />
                {/* <i>Password1</i> */}
                {errors.p1 ? (
                    <p className={styles.errors}>{errors.p1}</p>
                ) : (
                    <p className={styles.errors}>{errors.p2}</p>
                )}
            </div>
            <div className={styles.inputbox}>
                {/* <button type="submit">Submit</button> */}
                <input type="submit" value="Registrarse" onClick={handleSubmit} />
            </div>
        </form>
    );
};

export default RegistrationForm;
