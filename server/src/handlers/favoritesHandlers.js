const { addFavorite } = require("../controllers/favoritesControllers");

const addFavoriteHandler = async (req, res) => {
    try {
        const { userId } = request.params;
        const { success, message, favorites } = await addFavorite(req.body, userId);
        if (success) {
            res.status(200).json({ success, message, favorites });
        } else {
            res.status(401).json({ success, error: message });
        }
    } catch (error) {
            console.error("Error al intentar agregar un favorito: ", error);
        return res.status(500).json({
            message: "Se produjo un error al intentar agregar un favorito.",
        });
    }
};

const getFavoritesHandler = async (req, res) => {
    try {
        


    } catch (error) {
        console.log(error);
        return response.status(500).send(error.message);
    }
};

module.exports = { addFavoriteHandler, getFavoritesHandler };
