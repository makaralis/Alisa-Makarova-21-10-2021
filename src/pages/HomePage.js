import "firebase/firestore";
import { useFirestore } from "reactfire";
import { useState, useEffect } from "react";
import { Autocomplete, IconButton, TextField, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import useGeoLocation from '../hooks/useGeoLocation';
import { AutocompleteWrapper, StyledGrid, Container } from "../styles/homePageStyles";
import WeatherCard from "../components/WeatherCard";
import Loading from "../components/Loading";
import axios from "axios";
import { toast } from "react-toastify";
import { days, setMyCityData, addToFavorites, getCities } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import { chooseCity } from "../actions";
import useItems from "../hooks/useItems";

const HomePage = () => {
    const [citiesOptions, setCitiesOptions] = useState([]);
    const [chosenCity, setChosenCity] = useState('');
    const [cityKey, setCityKey] = useState('');
    const [forecast, setForecast] = useState([]);
    const [currentForecast, setCurrentForecast] = useState([]);
    const [isCitySelected, setIsCitySelected] = useState(false);

    const [firebaseData, setFirebaseData] = useState([]);
    const db = useFirestore();
    
    useItems(db, "Favorites", setFirebaseData, firebaseData);

    const chosenCityRed = useSelector((state) => {return state.chosenCityReducer});
    const [loading, setLoading] = useState(chosenCityRed.data?.length < 1 || chosenCityRed.data === undefined ? true : false);

    const dispatch = useDispatch();

    const geoLocation = useGeoLocation();


    const getForecast = async (key) => {
        try {
            const res = await axios.get(
            `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${process.env.REACT_APP_ACCUWEATHER_API_KEY}&details=true`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            );
        
            const currentRes = await axios.get(
            `https://dataservice.accuweather.com/currentconditions/v1/${key}/?apikey=${process.env.REACT_APP_ACCUWEATHER_API_KEY}&details=true`,{
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            );
        
            if (res && currentRes) {
                setForecast(res.data.DailyForecasts);
                setCurrentForecast(currentRes.data[0].WeatherText);
                setLoading(false);
            }
        }
        catch (err) {
            toast.error('Error while getting information about forecast', toast.POSITION.BOTTOM_RIGHT);
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
        
            setLoading(true);
            getForecast(city.Key);
        }
    }

    useEffect( () => {
        if (geoLocation.loaded && geoLocation.error === undefined && (chosenCityRed.data === undefined || chosenCityRed.data?.length < 1)) {
            setMyCityData(geoLocation, (val) => setIsCitySelected(val), (val) => setChosenCity(val), (val) => setCityKey(val), getForecast);
        }
        
        getCities(geoLocation, (val) => setCitiesOptions(val), dispatch, chosenCityRed)}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [geoLocation]);

    useEffect(() => {
        if (isCitySelected && chosenCity !== '') {
          dispatch(chooseCity(chosenCity, cityKey, forecast, currentForecast));
        }
      }, [chosenCity, cityKey, forecast, currentForecast, dispatch, isCitySelected])


    return (
        <Container>
            <AutocompleteWrapper>
                <Autocomplete
                    disablePortal
                    options={citiesOptions.map((item) => item.EnglishName)}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="City"/>}
                    onChange={handleAutocompleteChange}
                    />
            
            </AutocompleteWrapper>
​
​
            {loading ? (
                <Container>
                    <h1>Loading the city weather data...</h1>
                    <Loading/>
                </Container>) : (
                <> 
                    <Typography variant='h2' sx={{marginBottom: '12px', fontWeight:'bold'}}>{chosenCityRed.data}</Typography>
                    <Typography variant='h4' sx={{marginBottom: '20px'}}>Today is  {chosenCityRed.currentForecast}</Typography>
​
                    <Typography variant='body1' sx={{marginBottom: '10px'}}>Add to favorites</Typography>
​
                    <IconButton onClick={() => addToFavorites(db, firebaseData, chosenCityRed)} sx={{marginBottom: '40px'}}>
                        {firebaseData.findIndex(x => x.city === chosenCityRed.data) === -1
                        ? <FavoriteBorderIcon fontSize="large" color={"primary"}/>
                        : <FavoriteIcon fontSize="large" color={"primary"}/>}</IconButton>
            
                    <StyledGrid container justifyContent='center' spacing={{ xs: 2, md: 3, lg: 6, xl: 2 }}>
                        {chosenCityRed.forecast.map((item, index) => 
                        <WeatherCard key={item.EpochDate} minTemp={item.Temperature.Minimum.Value} maxTemp={item.Temperature.Maximum.Value}
                        day={days[new Date(item.Date).getDay()]}/>)}
                    </StyledGrid>
                </>)}
        </Container>)
}

export default HomePage;