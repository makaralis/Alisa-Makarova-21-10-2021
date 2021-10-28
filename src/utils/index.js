import axios from "axios";
import { toast } from "react-toastify";
import { chooseCity } from "../actions";


const findMyCity = async (lat, ln) => {
    try {
        const res = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.REACT_APP_ACCUWEATHER_API_KEY}&q=${lat}%2C%20${ln}`);
        
        return res.data;
    }
    catch (err) {
        toast.error('Error while getting a current location', toast.POSITION.BOTTOM_RIGHT);
    }
}

export const setMyCityData = async (geoLocation, setIsCitySelected, setChosenCity, setCityKey, getForecast) => {
    try {
        const data = await findMyCity(geoLocation.coordinates.lat, geoLocation.coordinates.lng);

        if (data) {
            setIsCitySelected(true);
            setChosenCity(data.ParentCity?.EnglishName);
            setCityKey(data.ParentCity?.Key);
            await getForecast(data.ParentCity?.Key);
        }
    }
    catch (err) {
        toast.error('Error while getting your city data', toast.POSITION.BOTTOM_RIGHT);
    }
}

export const getCities = async (geoLocation, setCitiesOptions, dispatch, chosenCityRed) => {
    try {
        const res = await axios.get(`https://dataservice.accuweather.com/locations/v1/topcities/150?apikey=${process.env.REACT_APP_ACCUWEATHER_API_KEY}`);

        setCitiesOptions(res ? res.data : []);

        if (chosenCityRed.data.length < 1 && geoLocation.error !== undefined) {
            const res = await axios.get(
              `http://dataservice.accuweather.com/forecasts/v1/daily/5day/215854?apikey=${process.env.REACT_APP_ACCUWEATHER_API_KEY}`
            );

      
            const currentRes = await axios.get(
              `https://dataservice.accuweather.com/currentconditions/v1/215854/?apikey=${process.env.REACT_APP_ACCUWEATHER_API_KEY}`
            );
      
           dispatch(chooseCity("Tel Aviv", "215854", res.data.DailyForecasts, currentRes.data[0].WeatherText));
          }
    }
    catch (err) {
        toast.error('Error while getting locations', toast.POSITION.BOTTOM_RIGHT);
    }
}


// export const getForecast = async (key, setForecast, setCurrentForecast) => {
//     try {
//         const res = await axios.get(
//         `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${process.env.REACT_APP_ACCUWEATHER_API_KEY}&details=true`
//         );
    
//         const currentRes = await axios.get(
//         `https://dataservice.accuweather.com/currentconditions/v1/${key}/?apikey=${process.env.REACT_APP_ACCUWEATHER_API_KEY}&details=true`
//         );
    
//         if (res && currentRes) {
//             setForecast(res.data.DailyForecasts);
//             setCurrentForecast(currentRes.data[0].WeatherText);
//         }
//     }
//     catch (err) {
//         toast.error('Error while getting information about forecast', toast.POSITION.BOTTOM_RIGHT);
//     }
// }

export const addToFavorites = (db, firebaseData, chosenCityRed) => {
    if (firebaseData.findIndex(x => x.city === chosenCityRed.data) === -1) {
        db.collection("Favorites")
            .add({
                city: chosenCityRed.data,
                currentWeather: chosenCityRed.currentForecast,
                key: chosenCityRed.key,
                forecast: chosenCityRed.forecast
            });
    } else {
        let index = firebaseData.findIndex(x => x.city === chosenCityRed.data);
        db.collection("Favorites").doc(firebaseData[index].id).delete();
    }
}


export const fToC = (fahrenheitValue)  => {
    return Math.round((fahrenheitValue - 32) * 5/9);
}

export const  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
