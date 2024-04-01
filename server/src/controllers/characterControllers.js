const axios = require("axios");

const getCharacterById = async (id) => {

    try {
    const { data } = await axios.get(
        `https://rickandmortyapi.com/api/character/${id}`
    );

    const character = {
        id,
        name: data.name,
        status: data.status,
        origin: data.origin,
        image: data.image,
        gender: data.gender,
        species: data.species,
    };

    return character;
    } catch (error) {
        return response.status(500).send(error.message);
    }
};

module.exports = {
    getCharacterById,
};
