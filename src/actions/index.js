
import { chooseCityAction } from "./consts";

export const chooseCity = (option, keyCode, forecast, current) => {
    return {
      type: chooseCityAction,
      data: option,
      key: keyCode,
      fiveDaysForecast: forecast,
      currentForecast: current
    };
  };