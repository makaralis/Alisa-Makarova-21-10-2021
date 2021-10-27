import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Autocomplete, TextField, Typography } from "@mui/material";
import useGeoLocation from '../hooks/useGeoLocation';
import { AutocompleteWrapper, StyledGrid } from "../styles/homePageStyles";
import WeatherCard from "../components/WeatherCard";
import Loading from "../components/Loading";

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const HomePage = () => {
    const [citiesOptions, setCitiesOptions] = useState([]);
    const [chosenCity, setChosenCity] = useState({name: '', key: ''});
    const [weatherInfo, setWeatherInfo] = useState([]);
    const [currentForecast, setCurrentForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showLocation, setShowLocation] = useState(false);
    

    const geoLocation = useGeoLocation();

    let longitude = 0;
    let latitude = 0;

    if (geoLocation.loaded) {
        longitude = geoLocation.coordinates.lng;
        latitude = geoLocation.coordinates.lat;;
    }

    const getCities = async () => {
        try {
            const res = await axios.get(`https://dataservice.accuweather.com/locations/v1/topcities/150?apikey=${process.env.ACCUWEATHER_API_KEY}`);

            setCitiesOptions(res ? res.data : []);
        }
        catch (err) {
            console.log(err);
        }
    }

    const getForecast = async (key) => {
        try {
            const res = await axios.get(
            `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${process.env.ACCUWEATHER_API_KEY}&details=true`
            );
        
            const currentRes = await axios.get(
            `https://dataservice.accuweather.com/currentconditions/v1/${key}/?apikey=${process.env.ACCUWEATHER_API_KEY}&details=true`
            );
        
            if (res && currentRes) {
                setWeatherInfo(res.data.DailyForecasts);
                console.log(currentRes)
                setCurrentForecast(currentRes.data[0].WeatherText);
                setLoading(false);
            }
        }
        catch (err) {
            toast.error('Error while getting information about forecast', toast.POSITION.BOTTOM_RIGHT);
        }
    
    }

    const findMyCity = async (lat, ln) => {
        try {
            const res = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.ACCUWEATHER_API_KEY}&q=${lat}%2C%20${ln}`);
            
            setChosenCity({name: res.data.ParentCity.EnglishName, key: res.data.ParentCity.Key})
        }
        catch (err) {
            toast.error('Error while getting a current location', toast.POSITION.BOTTOM_RIGHT);
        }
    }

    const handleAutocompleteChange = (event , val) => {
        const city = citiesOptions.find((city) => city.EnglishName === val);

        setChosenCity({name: city.EnglishName, key: city.Key});
        getForecast(city.Key);
        setLoading(true);
    }

    useEffect(() => 
        getCities()
    , []);


    return (
        <div style={{ display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'}}>
            <AutocompleteWrapper>
                <Autocomplete
                    disablePortal
                    options={citiesOptions.map((item) => item.EnglishName)}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="City"/>}
                    onChange={handleAutocompleteChange}
                    />
            
            </AutocompleteWrapper>

            <button onClick={() => {setShowLocation(true); findMyCity(latitude, longitude)}}>Show curr location</button>
            {showLocation ? <>{chosenCity.name}</> : <></>}

            {loading ? <Loading/> : <>
            <Typography variant='h2' sx={{marginBottom: '12px', fontWeight:'bold'}}>{chosenCity.name}</Typography>
            <Typography variant='h4' sx={{marginBottom: '20px'}}>Today is  {currentForecast}</Typography>


            <StyledGrid container justifyContent='center' spacing={{ xs: 2, md: 3, lg: 6 }}>
                {weatherInfo.map((item) => 
                <WeatherCard minTemp={item.Temperature.Minimum.Value} maxTemp={item.Temperature.Maximum.Value} realMinTemp={item.RealFeelTemperature.Minimum.Value} realMaxTemp={item.RealFeelTemperature.Maximum.Value}
                day={days[new Date(item.Date).getDay()]}/>)}
             </StyledGrid>
             </>}
        </div>)
}

export default HomePage;