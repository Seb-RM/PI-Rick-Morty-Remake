import { ADD_FAV, REMOVE_FAV, FILTER_CARDS, ORDER, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "./actions-types";

// import axios from "axios";

export const loginSuccess = (userId, userFavorites) => ({
    type: LOGIN_SUCCESS,
    payload: { userId, userFavorites },
});

export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: { error },
});

export const logout = () => ({
    type: LOGOUT,
});

export const addFav = (character, userId) => async (dispatch) => {
    // const endpoint = `http://localhost:3001/rickandmorty/fav/${userId}`;
    // return async (dispatch) => {
    //     const {data} = await axios.post(endpoint, character);
    //     console.log(data)
        dispatch({
            type: ADD_FAV,
            payload: character,
        });
    // };
};

export const removeFav = (id) => async (dispatch) => {
  // const endpoint = "http://localhost:3001/rickandmorty/fav/" + id;
  // return async (dispatch) => {
  //     const  {data} = await axios.delete(endpoint);
    dispatch({
        type: REMOVE_FAV,
        payload: data,
    });
  // };
};


export const filterCards = (gender) => {
    return {
        type: FILTER_CARDS,
        payload: gender,
    };
};

export const orderCards = (order) => {
    return {
        type: ORDER,
        payload: order
    }
}