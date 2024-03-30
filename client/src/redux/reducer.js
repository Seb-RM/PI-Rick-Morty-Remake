/* eslint-disable no-case-declarations */
import { ADD_FAV, REMOVE_FAV, FILTER_CARDS, ORDER } from "./actions-types";


const initialState = {
    myFavorites: [],
    allCharacters: []
}

const reducer = (state=initialState, action) =>{
    switch(action.type){
        case ADD_FAV:
            return { ...state,
                    myFavorites: action.payload, 
                    allCharacters: action.payload };
        
        case REMOVE_FAV:
            return {
                ...state,
                myFavorites: action.payload,
                allCharacters: action.payload,
            };

        case FILTER_CARDS:
            if (action.payload === "All")
                return {
                ...state,
                myFavorites: state.allCharacters,
                };
            const filteredCharacters = state.allCharacters.filter((char)=> char.gender === action.payload);
            return{
                ...state,
                myFavorites: filteredCharacters
            }

        case ORDER:
            let orderCopy = [...state.myFavorites];
            if(action.payload === 'A'){
                orderCopy.sort((a,b)=>{
                    if(a.name > b.name) return 1;
                    else return -1;
                })
            } else if (action.payload === 'D') {
                orderCopy.sort((a, b) => {
                    if (a.name < b.name) return 1;
                    else return -1;
                });
            }
            return {
                ...state,
                myFavorites: orderCopy
            }
            

        default: return {
            ...state,
        }
    }
}

export default reducer;