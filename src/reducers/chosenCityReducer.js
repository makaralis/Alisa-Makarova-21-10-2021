import { chooseCityAction } from "../actions/consts";

const initialState = {
    data: [],
    key: '',
    forecast: [],
    currentForecast: []
  };
  
  const chosenCityReducer = (state = initialState, action) => {
    switch (action.type) {
      case chooseCityAction:
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