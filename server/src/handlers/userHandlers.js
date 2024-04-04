const { createUser, loginUser, getUserById} = require("../controllers/usersControllers.js");

const createUserHandler = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { success, message, createdUser } = await createUser(
            email,
            password
        );
        if (success) {
            res.status(201).json({ success, message, createdUser });
        } else {
            res.status(409).json({ success, error: message });
        }
    } catch (error) {
        console.error("Error al procesar la creación de usuario: ", error);
            return res.status(500).json({
                success: false,
                message:
                    "Se produjo un error al procesar la creación de usuario.",
            });
    }
};

const loginUserHandler = async (req, res) => {
    try {
        const { success, message, userId } = await loginUser(
        req.body
        );
        if (success) {
        res.status(200).json({ success, message, userId });
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

const getUserByIdHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const { success, message, existingUser } = await getUserById(id);
        if (success) {
            res.status(200).json({ success, message, existingUser });
        } else {
            res.status(404).json({ success, error: message });
        }
    } catch (error) {
        console.error("Error al procesar la búsqueda: ", error);
        return res.status(500).json({
            message: "Se produjo un error al procesar la búsqueda del usuario.",
        });
    }
};

module.exports = { createUserHandler, loginUserHandler, getUserByIdHandler };
