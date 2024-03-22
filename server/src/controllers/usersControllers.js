const { User } = require("../DB_connection");

const createUserController = async (
    email,
    password
) => {

    if (!email || !password) {
        return {
            success: false,
            message: "Por favor, complete todos los campos.",
        };
    }
    try {
        const existingSitter = await User.findOne({ where: { email } });
        if (existingSitter) {
            return {
                success: false,
                message:
                "Ya tienes una cuenta registrada con ese correo electrónico.",
            };
        }

        const createdUser = await User.create({
            email,
            password,
        });

        return {
            success: true,
            message: "Inicio de sesión exitoso.",
            userId: findUser.dataValues.id,
        };

    } catch (error) {
        console.error("Error al procesar el registro de nuevo usuario:", error);
        return {
            success: false,
            message:
            "Se produjo un error al procesar el registro de nuevo usuario. Por favor, inténtelo de nuevo más tarde.",
        };
    }
    
};


const loginUser = async ({ email, password }) => {

    if (!email || !password) {
        return {
        success: false,
        message: "Por favor, complete todos los campos.",
        };
    }
    try {
        let findUser = await User.findOne({ where: { email } });
        if (!findUser) {
            return {
                success: false,
                message: "Correo electrónico no encontrado.",
            };
        }
        if (password !== findUser.password) {
            return {
                success: false,
                message:
                "Contraseña incorrecta. Por favor, verifique su contraseña e intente de nuevo.",
            };
        }

        return {
            success: true,
            message: "Inicio de sesión exitoso.",
            userId: findUser.dataValues.id,
        };

    } catch (error) {
        console.error("Error al procesar el inicio de sesión:", error);
        return {
            success: false,
            message:
                "Se produjo un error al procesar el inicio de sesión. Por favor, inténtelo de nuevo más tarde.",
        };
    }
};

module.exports = { createUserController, loginUser };
