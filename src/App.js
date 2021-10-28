import {
  BrowserRouter as Router, Switch, Route
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import './App.css';
import Navbar from "./components/Navbar";
import { Container } from "./styles/globalStyles";
import { Container as LoadingContainer } from "./styles/homePageStyles";
import useTempUnit from "./hooks/useTempUnit";
import useTheme from "./hooks/useTheme";
import Loading from "./components/Loading";



function App() {
  const theme = useTheme();
  const temp = useTempUnit();
  

  return (
    <>
      <Router>
        {theme?.modeStatus === 'loading' && temp?.modeStatus === 'loading' && 
        <LoadingContainer>
          <h1>Loading the data...</h1>
          <Loading/>
        </LoadingContainer>}
        {theme?.modeStatus !== 'loading' && temp?.modeStatus !== 'loading' &&
        <Container theme={theme?.themeData}>
          <Navbar/>
            <Switch>
                <Route path='/' exact component={HomePage}/>
                <Route path='/favorite-cities' component={FavoritesPage}/>
            </Switch>
        </Container>
      }
      </Router>
    </>
  );
}

export default App;
