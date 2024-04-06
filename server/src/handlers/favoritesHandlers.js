const {
    addFavorite,
    deleteFavorite,
    getFavorites,
} = require("../controllers/favoritesControllers");

const addFavoriteHandler = async (req, res) => {
    try {
        const { userId } = req.params;
        const { success, message, favorites } = await addFavorite(req.body, userId);
        if (success) {
            res.status(200).json({ success, message, favorites });
        } else {
            res.status(409).json({ success, error: message });
        }
    } catch (error) {
            console.error("Error al intentar agregar un favorito: ", error);
        return res.status(500).json({
            message: "Se produjo un error al intentar agregar un favorito.",
        });
    }
};

const deleteFavoriteHandler = async (req, res) => {
    try {
        
        const { userId } = req.params;
        const { success, message, favorites } = await deleteFavorite(req.body, userId);
        if (success) {
            res.status(200).json({ success, message, favorites });
        } else {
            res.status(409).json({ success, error: message });
        }
    } catch (error) {
            console.error("Error al intentar eliminar un favorito: ", error);
            return res.status(500).json({
            message: "Se produjo un error al intentar eliminar un favorito.",
        });
    }
};

const getFavoritesHandler = async (req, res) => {
    try {
        const { userId } = request.params;
        const { success, message, favorites } = await getFavorites(userId);
        if (success) {
            res.status(200).json({ success, message, favorites });
        } else {
            res.status(409).json({ success, error: message });
        }
        } catch (error) {
            console.error("Error al intentar agregar un favorito: ", error);
        return res.status(500).json({
                message: "Se produjo un error al intentar agregar un favorito.",
        });
        }
};

module.exports = {
    addFavoriteHandler,
    deleteFavoriteHandler,
    getFavoritesHandler,
};
