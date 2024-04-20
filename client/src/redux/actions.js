import { ADD_FAV, ADD_FAV_FAILURE, REMOVE_FAV, REMOVE_FAV_FAILURE, FILTER_CARDS, ORDER, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, GUEST_LOGIN, ADD_GUEST_FAV, REMOVE_GUEST_FAV } from "./actions-types";

import axios from "axios";

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

export const loginGuestUser = () => ({
    type: GUEST_LOGIN,
});

export const addFav = (character, userId) => async (dispatch) => {
    try {
        const endpoint = `http://localhost:3001/rickandmorty/favorites/${userId}`;
        const {data} = await axios.post(endpoint, character);
        console.log(data.favorites)
        dispatch({
            type: ADD_FAV,
            payload: data.favorites,
        });
    } catch (error) {
        dispatch({
            type: ADD_FAV_FAILURE,
            payload: error.message,
        });
    }
};

export const removeFav = (id, userId) => async (dispatch) => {
    try {
        
        const endpoint = `http://localhost:3001/rickandmorty/favorites/${userId}`;
        const { data } = await axios.put(endpoint, {id});
        
        dispatch({
        type: REMOVE_FAV,
        payload: data.favorites,
        });
    } catch (error) {
        dispatch({
        type: REMOVE_FAV_FAILURE,
        payload: error.message,
        });
    }
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
};

export  const addGuestFav = (character) => (dispatch) => {
    console.log(character)
    dispatch({
        type: ADD_GUEST_FAV,
        payload: character,
    });
};

export const removesGuestFav = (id) => (dispatch) => {
    dispatch({
        type: REMOVE_GUEST_FAV,
        payload: id,
    });
};