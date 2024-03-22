const { createUser, loginUser} = require("../controllers/usersControllers.js");

const createUserHandler = async (req, res) => {
    const { email, password } = req.body;
    try {
        const response = await createUser(
        email,
        password
        );
        res.status(201).json(response);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const loginUserHandler = async (req, res) => {
    try {
        const { success, message, userId } = await loginUser(
        req.body
        );
        if (success) {
        res.status(200).json({ message, userId });
        } else {
        res.status(401).json({ success, error: message });
        }
    } catch (error) {
        console.error("Error al procesar el inicio de sesión:", error);
        return res.status(500).json({
        message: "Se produjo un error al procesar el inicio de sesión.",
        });
    }
};


module.exports = { createUserHandler, loginUserHandler };
