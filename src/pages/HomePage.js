import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Autocomplete, TextField, Typography } from "@mui/material";
import useGeoLocation from '../hooks/useGeoLocation';
import { AutocompleteWrapper, StyledGrid, Container } from "../styles/homePageStyles";
import WeatherCard from "../components/WeatherCard";
import Loading from "../components/Loading";
import { findMyCity } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import { chooseCity } from "../actions";
import useTheme from "../hooks/useTheme";
import useTempUnit from '../hooks/useTempUnit'

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const HomePage = () => {
    const [citiesOptions, setCitiesOptions] = useState([]);
    const [selectCity, setSelectCity] = useState('Tel Aviv');
    const [cityKey, setCityKey] = useState('');
    const [forecast, setForecast] = useState([]);
    const [currentForecast, setCurrentForecast] = useState([]);
    const [isCitySelected, setIsCitySelected] = useState(false);

    const theme = useTheme();
    const temp = useTempUnit();

    const selectCityRed = useSelector((state) => {return state.chosenCityReducer});

    const dispatch = useDispatch();

    // const geoLocation = useGeoLocation();

    // let longitude = 0;
    // let latitude = 0;

    // if (geoLocation.loaded && chosenCity.name === '') {
    //     longitude = geoLocation.coordinates?.lng;
    //     latitude = geoLocation.coordinates?.lat;
    //     findMyCity(latitude, longitude)
    //         .then((data) => {
    //             setChosenCity({name: data.ParentCity.EnglishName, key: data.ParentCity.Key});
    //             getForecast(data.ParentCity.Key);
    //         });
    // }

    // if (geoLocation.loaded.coordinates === undefined && chosenCity.name === '') {
    //     console.log('here');
    //     // IF THE USER DONT WANT TO SHOW LOCATION
    // }
   

    const getCities = async () => {
        try {
            const res = await axios.get(`https://dataservice.accuweather.com/locations/v1/topcities/150?apikey=${process.env.REACT_APP_ACCUWEATHER_API_KEY}`);

            setCitiesOptions(res ? res.data : []);

            if (selectCityRed.data.length < 1) {
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

    const getForecast = async (key) => {
        try {
            const res = await axios.get(
            `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${process.env.REACT_APP_ACCUWEATHER_API_KEY}&details=true`
            );
        
            const currentRes = await axios.get(
            `https://dataservice.accuweather.com/currentconditions/v1/${key}/?apikey=${process.env.REACT_APP_ACCUWEATHER_API_KEY}&details=true`
            );
        
            if (res && currentRes) {
                setForecast(res.data.DailyForecasts);
                setCurrentForecast(currentRes.data[0].WeatherText);
            }
        }
        catch (err) {
            toast.error('Error while getting information about forecast', toast.POSITION.BOTTOM_RIGHT);
        }
    
    }

    const handleAutocompleteChange =  (event , val) => {
        const city = citiesOptions.find((city) => city.EnglishName === val);

        setIsCitySelected(true)
        setSelectCity(city.EnglishName);
        setCityKey(city.Key);
    
        getForecast(city.Key);
    }

    useEffect(() => 
        getCities()
    , []);

    useEffect(() => {
        if (isCitySelected) {
          dispatch(chooseCity(selectCity, cityKey, forecast, currentForecast));
        }
      }, [selectCity, cityKey, forecast, currentForecast, dispatch, isCitySelected])


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
                        onChange={ handleAutocompleteChange}
                        />
                
                </AutocompleteWrapper>

                {selectCityRed.forecast !== undefined && selectCityRed.currentForecast !== undefined && typeof selectCityRed.currentForecast !== 'object' ? (
                    <> 
                        <Typography variant='h2' sx={{marginBottom: '12px', fontWeight:'bold'}}>{selectCityRed.data}</Typography>
                        <Typography variant='h4' sx={{marginBottom: '20px'}}>Today is  {selectCityRed.currentForecast}</Typography>
                
                        <StyledGrid container justifyContent='center' spacing={{ xs: 2, md: 3, lg: 6, xl: 2 }}>
                            {selectCityRed.forecast.map((item) => 
                            <WeatherCard minTemp={item.Temperature.Minimum.Value} maxTemp={item.Temperature.Maximum.Value}
                            day={days[new Date(item.Date).getDay()]}/>)}
                        </StyledGrid>
                    </>)
                : null}
            </>)
        }    
        </Container>)
}

export default HomePage;