import { List, ListItem, Typography, Divider } from '@mui/material';
import useTempUnit from '../hooks/useTempUnit';
import { StyledGridCard } from '../styles/globalStyles';


const WeatherCard = ({minTemp,maxTemp, day}) => {
  const temp = useTempUnit();
  let minTempStr = minTemp + '°F';
  let maxTempStr = maxTemp + '°F';


  const fToC = (fahrenheitValue)  => {
    return Math.round((fahrenheitValue - 32) * 5/9);
  }

  if (temp?.tempData === 'farenheit') {
    minTempStr = fToC(minTemp) + '°C';
    maxTempStr = fToC(maxTemp) + '°C';
  }

  return (
    <StyledGridCard item xs={12} sm={6} md={3} lg={2} xl={2}>
        <Typography variant="h4" color="textPrimary">
         {day}
        </Typography>

        <Divider sx={{paddingTop: '8px', marginBottom: '10px'}}/>

        <List>
            <ListItem>{minTempStr} / {maxTempStr}</ListItem>
        </List>
     
    </StyledGridCard>
  );
};



export default WeatherCard;
