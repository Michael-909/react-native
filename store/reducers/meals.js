import { MEALS } from '../../data/dummy-data';
import { SET_FILTERS, TOGGLE_FAVORITE } from '../actions/meals';

const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVORITE:
            const existingIndex = state.favoriteMeals.findIndex(x => x.id === action.mealId);
            if (existingIndex >= 0) {
                const updatedMeals = [...state.favoriteMeals];
                updatedMeals.splice(existingIndex, 1);
                return {...state, favoriteMeals: updatedMeals};
            } else {
                const meal = state.meals.find(x => x.id == action.mealId);
                return {...state, favoriteMeals: state.favoriteMeals.concat(meal)};
            }
        case SET_FILTERS:
            const appliedFilters = action.filters;
            const filteredMeals = state.meals.filter(x => {
                if(appliedFilters.glutenFree && !x.isGlutenFree) return false;
                if(appliedFilters.lactorsFree && !x.isLactorsFree) return false;
                if(appliedFilters.vegan && !x.isVegan) return false;
                if(appliedFilters.vegeterian && !x.isVegeterian) return false;
                return true;
            });
            return {...state, filteredMeals: filteredMeals};
        default:
            return state;
    }
};

export default mealsReducer;
