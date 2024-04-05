/* eslint-disable no-case-declarations */
import { ADD_FAV, REMOVE_FAV, FILTER_CARDS, ORDER, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, ADD_FAV_FAILURE } from "./actions-types";


const initialState = {
    userId: null,
    myFavorites: [],
    allFavorites: [],
    loggedIn: false,
    error: null
};

const reducer = (state=initialState, action) =>{
    switch (action.type) {
        case LOGIN_SUCCESS:
            console.log(state.allFavorites)
            return {
            ...state,
            userId: action.payload.userId,
            myFavorites: action.payload.userFavorites,
            allFavorites: action.payload.userFavorites,
            loggedIn: true,
            };
        case LOGIN_FAILURE:
            return {
            ...state,
            userId: null,
            myFavorites: [],
            loggedIn: false,
            error: action.payload.error,
            };

        case LOGOUT:
            return {
            ...state,
            userId: null,
            myFavorites: [],
            loggedIn: false,
            };

        case ADD_FAV:
            console.log(state.allFavorites);
            console.log(action.payload)
            return {
            ...state,
            myFavorites: action.payload,
            allFavorites: action.payload,
            };

        case ADD_FAV_FAILURE:
            return {
            ...state,
            error: action.payload,
            };
            
        case REMOVE_FAV:
            console.log(state.allFavorites)
            return {
            ...state,
            myFavorites: action.payload,
            allFavorites: action.payload,
            };

        case FILTER_CARDS:
            if (action.payload === "All")
            return {
                ...state,
                myFavorites: state.allFavorites,
            };
            const filteredFavorites = state.allFavorites.filter(
            (char) => char.gender === action.payload
            );
            return {
            ...state,
            myFavorites: filteredFavorites,
            };

        case ORDER:
            let orderCopy = [...state.myFavorites];
            if (action.payload === "A") {
            orderCopy.sort((a, b) => {
                if (a.name > b.name) return 1;
                else return -1;
            });
        } else if (action.payload === "D") {
            orderCopy.sort((a, b) => {
                if (a.name < b.name) return 1;
                else return -1;
            });
        }
        return {
            ...state,
            myFavorites: orderCopy,
        };
        
        default:
            return {
                state,
            };
        }
    }
    
export default reducer;