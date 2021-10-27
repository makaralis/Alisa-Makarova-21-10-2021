
import "firebase/firestore";
import { useFirestore } from "reactfire";
import { useState, useEffect } from 'react';
import CityCard from '../components/CityCard';
import useTheme from '../hooks/useTheme';
import { Container, StyledGrid } from "../styles/homePageStyles";
import { Typography } from "@mui/material";

const  FavoritesPage = () => {
  const [firebaseData, setFirebaseData] = useState([]);
  const db = useFirestore();
  const theme = useTheme();

  const useItems = (col, callback, items) => {
    useEffect(() => {
      const fetchData = async () => {
        await db
          .collection(col)
          .onSnapshot((snapshot) => {
            let listItems = [];

            listItems = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            callback(listItems);
          });
      };
      fetchData();
    }, []);
    return items;
  };

  useItems("Favorites", setFirebaseData, firebaseData);

  return (
    <>
      {theme?.modeStatus !== 'loading' &&
        <Container>
           <Typography variant='h2' sx={{marginTop: '20px', marginBottom: '12px', fontWeight:'bold'}}>List of favorite cities</Typography>
           <StyledGrid container justifyContent='center' spacing={{ xs: 2, md: 3, lg: 6, xl: 2 }}>

            {firebaseData
              .map(item => 
                  <CityCard name={item.city} firebaseId={item.id} key={item.key} forecast={item.forecast} currentForecast={item.currentWeather} />
                )
            }
            </StyledGrid>
        </Container>
      }
    </>
  );
}

export default FavoritesPage;
