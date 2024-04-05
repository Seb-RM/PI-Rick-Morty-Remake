const { User } = require("../DB_connection");

const addFavorite = async (
    { id, name, status, species, gender, origin, image },
    userId
    ) => {
    try {
        console.log(userId)
        const user = await User.findByPk(userId);
        console.log(user)
        if (!user) {
        return { success: false, message: "Usuario no encontrado." };
        }

        const existingFavorites = user.favorites || [];
        const existingFavorite = existingFavorites.find(
            (favorite) => favorite.id === id
        );

        if (existingFavorite) {
            return {
                success: false,
                message: "Este favorito ya existe para este usuario.",
            };
        }

        user.favorites = [
            ...existingFavorites,
            { id, name, status, species, gender, origin, image },
        ];
        await user.save();

        return {
            success: true,
            message: "Favorito agregado con éxito.",
            favorites: user.favorites,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message:
            "Se produjo un error al intentar agregar un favorito.",
        };
    }
};

const getFavorites = async (userId) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return { success: false, message: "Usuario no encontrado." };
        }
        const favorites = user.favorites || [];
        const message = favorites.length
            ? "Lista de favoritos encontrada."
            : "El usuario no tiene favoritos.";

        return {
            success: true,
            message,
            favorites,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Se produjo un error al obtener la lista de favoritos.",
        };
    }
};

module.exports = { addFavorite, getFavorites };
