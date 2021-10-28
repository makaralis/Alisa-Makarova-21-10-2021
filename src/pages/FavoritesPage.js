
import "firebase/firestore";
import { useFirestore } from "reactfire";
import { useState } from 'react';
import CityCard from '../components/CityCard';
import useTheme from '../hooks/useTheme';
import { Container, StyledGrid } from "../styles/homePageStyles";
import { Typography } from "@mui/material";
import useItems from "../hooks/useItems";

const  FavoritesPage = () => {
  const [firebaseData, setFirebaseData] = useState([]);
  const db = useFirestore();
  const theme = useTheme();

  useItems(db, "Favorites", setFirebaseData, firebaseData);

  return (
    <Container>
      {theme?.modeStatus !== 'loading' &&
            <>
            <Typography variant='h2' sx={{marginTop: '20px', marginBottom: '30px', fontWeight:'bold',  textAlign: 'center'}}>List of favorite cities</Typography>
            <StyledGrid container justifyContent='center' spacing={{ xs: 2, md: 3, lg: 6, xl: 2 }}>

              {firebaseData
                .map(item => 
                    <CityCard key={item.city} name={item.city} firebaseId={item.id} cityKey={item.key} forecast={item.forecast} currentForecast={item.currentWeather} />
                  )
              }
              </StyledGrid>
              </>
        }
    </Container>
  );
}

export default FavoritesPage;
