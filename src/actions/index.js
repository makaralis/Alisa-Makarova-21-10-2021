
import { CHOOSE_CITY } from "./consts";

export const chooseCity = (option, keyCode, forecast, current) => {
    return {
      type: CHOOSE_CITY,
      data: option,
      key: keyCode,
      fiveDaysForecast: forecast,
      currentForecast: current
    };
  };
