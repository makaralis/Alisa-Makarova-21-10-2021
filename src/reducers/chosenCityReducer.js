import { CHOOSE_CITY } from "../actions/consts";

const initialCityState = {
    data: [],
    key: '',
    forecast: [],
    currentForecast: []
  };
  
  const chosenCityReducer = (state = initialCityState, action) => {
    switch (action.type) {
      case CHOOSE_CITY:
        return {
            data: action.data,
            key: action.key,
            forecast: action.fiveDaysForecast,
            currentForecast: action.currentForecast
        };
  
      default:
        return state;
    }
  };

  export default chosenCityReducer;