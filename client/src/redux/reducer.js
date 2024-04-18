/* eslint-disable no-case-declarations */
import { ADD_FAV, REMOVE_FAV, FILTER_CARDS, ORDER, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, GUEST_LOGIN, ADD_FAV_FAILURE, REMOVE_FAV_FAILURE, ADD_GUEST_FAV, REMOVE_GUEST_FAV } from "./actions-types";


const initialState = {
    userId: null,
    myFavorites: [],
    allFavorites: [],
    loggedIn: false,
    error: null,
    guestUser: false
};

const reducer = (state=initialState, action) =>{
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        userId: action.payload.userId,
        myFavorites: action.payload.userFavorites,
        allFavorites: action.payload.userFavorites,
        loggedIn: true,
        guestUSer: false
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
        allFavorites: [],
        loggedIn: false,
        guestUSer: false,
      };

    case GUEST_LOGIN:
      return {
        ...state,
        guestUSer: action.payload,
      };
    case ADD_FAV:
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
      return {
        ...state,
        myFavorites: action.payload,
        allFavorites: action.payload,
      };

    case REMOVE_FAV_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case FILTER_CARDS:
      if (action.payload === "All")
        return {
          ...state,
          allFavorites: state.myFavorites,
        };
      const filteredFavorites = state.allFavorites.filter(
        (char) => char.gender === action.payload
      );

      return {
        ...state,
        allFavorites: filteredFavorites,
      };

    case ORDER:
      let orderCopy = [...state.allFavorites];

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
        allFavorites: orderCopy,
      };

    case ADD_GUEST_FAV:
      return {
        ...state,
        myFavorites: [...state.myFavorites, action.payload],
        allFavorites: [...state.allFavorites, action.payload],
      };

    case REMOVE_GUEST_FAV:
      const filteredGuestFavorites = state.myFavorites.filter(
        (favorite) => favorite.id !== action.payload
      );
      return {
        ...state,
        myFavorites: filteredGuestFavorites,
        allFavorites: filteredGuestFavorites,
      };

    default:
      return {
        ...state,
      };
  }
}
    
export default reducer;