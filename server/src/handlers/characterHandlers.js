const { getCharacterById } = require("../controllers/characterControllers");

const getCharacterByIdHandler = async (request, response) => {
  try {
    const { id } = request.params;
    
    const character = await getCharacterById(id);

    return response.status(200).json(character);
  } catch (error) {
      console.log(error)
      return response.status(500).send(error.message);
  }
};

module.exports = { getCharacterByIdHandler };
