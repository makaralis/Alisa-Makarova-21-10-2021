import { useState, useEffect } from "react";
import { Autocomplete, TextField, Typography } from "@mui/material";
import useGeoLocation from '../hooks/useGeoLocation';
import { AutocompleteWrapper, StyledGrid, Container } from "../styles/homePageStyles";
import WeatherCard from "../components/WeatherCard";
import Loading from "../components/Loading";
import axios from "axios";
import { toast } from "react-toastify";
import {  days, setMyCityData, getForecast } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import { chooseCity } from "../actions";
import useTheme from "../hooks/useTheme";
import useTempUnit from '../hooks/useTempUnit'


const HomePage = () => {
    const [citiesOptions, setCitiesOptions] = useState([]);
    const [chosenCity, setChosenCity] = useState('');
    const [cityKey, setCityKey] = useState('');
    const [forecast, setForecast] = useState([]);
    const [currentForecast, setCurrentForecast] = useState([]);
    const [isCitySelected, setIsCitySelected] = useState(false);

    const theme = useTheme();
    const temp = useTempUnit();

    const chosenCityRed = useSelector((state) => {return state.chosenCityReducer});
    const dispatch = useDispatch();

    const geoLocation = useGeoLocation();


    const getCities = async () => {
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

    

    const handleAutocompleteChange =  (event , val) => {
        const city = citiesOptions.find((city) => {
            if(val) {
                return city.EnglishName === val;
            }

            return null;
        });

        if (val) {
            setIsCitySelected(true)
            setChosenCity(city.EnglishName);
            setCityKey(city.Key);
        
            getForecast(city.Key, (val) => setForecast(val), (val) => setCurrentForecast(val));
        }
    }

    useEffect( () => {
        if (geoLocation.loaded && geoLocation.error === undefined && chosenCityRed.data.length < 1) {
            setMyCityData(geoLocation, (val) => setIsCitySelected(val), (val) => setChosenCity(val), (val) => setCityKey(val), (val) => setForecast(val), (val) => setCurrentForecast(val));
        }
        
        getCities()}
    , );

    useEffect(() => {
        if (isCitySelected && chosenCity !== '') {
          dispatch(chooseCity(chosenCity, cityKey, forecast, currentForecast));
        }
      }, [chosenCity, cityKey, forecast, currentForecast, dispatch, isCitySelected])


    return (
        <Container>
            {(citiesOptions.length === 0 ||  theme?.modeStatus === 'loading' || temp?.modeStatus === 'loading')  ? <Loading/> :
                (<>
                    <AutocompleteWrapper>
                        <Autocomplete
                            disablePortal
                            options={citiesOptions.map((item) => item.EnglishName)}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="City"/>}
                            onChange={handleAutocompleteChange}
                            />
                    
                    </AutocompleteWrapper>

                    {chosenCityRed.forecast !== undefined && chosenCityRed.currentForecast !== undefined && typeof chosenCityRed.currentForecast !== 'object' ? (
                        <> 
                            <Typography variant='h2' sx={{marginBottom: '12px', fontWeight:'bold'}}>{chosenCityRed.data}</Typography>
                            <Typography variant='h4' sx={{marginBottom: '20px'}}>Today is  {chosenCityRed.currentForecast}</Typography>
                    
                            <StyledGrid container justifyContent='center' spacing={{ xs: 2, md: 3, lg: 6, xl: 2 }}>
                                {chosenCityRed.forecast.map((item, index) => 
                                <WeatherCard key={item.EpochDate} minTemp={item.Temperature.Minimum.Value} maxTemp={item.Temperature.Maximum.Value}
                                day={days[new Date(item.Date).getDay()]}/>)}
                            </StyledGrid>
                        </>)
                    : null}
                </>)
            }    
        </Container>)
}

export default HomePage;