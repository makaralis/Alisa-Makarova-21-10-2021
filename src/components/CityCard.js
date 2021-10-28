import "firebase/firestore";
import { useFirestore } from "reactfire";
import { Typography,  Divider, Grid, Button} from '@mui/material';
import { StyledGridCard } from '../styles/cityCardStyles';
import { useDispatch } from "react-redux";
import { chooseCity } from '../actions';
import { useHistory} from 'react-router-dom';
import { Container } from "../styles/homePageStyles";

const CityCard = ({name, cityKey, forecast, firebaseId, currentForecast}) => {
  const dispatch = useDispatch();
  const db = useFirestore();
  const history = useHistory();

  const handleDelete = () => {
    db.collection("Favorites").doc(firebaseId).delete();
  }

  const backHome = () => {
      dispatch(chooseCity(name, cityKey, forecast, currentForecast));

      history.push('/');
  }

  return (
    <StyledGridCard item xs={12} sm={6} md={3} lg={2} xl={2} onClick={backHome}>
        <Typography variant="h4" color="textPrimary">
          {name}
        </Typography>

        <Divider />
        <Grid sx={{marginTop: '10px', marginBottom: '10px'}}>
          <Typography>Current weather:</Typography>
          <Typography>{currentForecast}</Typography>
        </Grid>
        <Container>
          <Button onClick={handleDelete} variant='outlined' sx={{marginBottom: '-60px', background: '#fff'}}>Remove city</Button>
        </Container>
    </StyledGridCard>
  );
};



export default CityCard;
