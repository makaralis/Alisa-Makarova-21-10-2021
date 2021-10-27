import {
  BrowserRouter as Router, Switch, Route
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import FavesPage from "./pages/FavesPage";
import './App.css';
import Navbar from "./components/Navbar";
import { Container } from "./styles/globalStyles";
import useTempUnit from "./hooks/useTempUnit";
import useTheme from "./hooks/useTheme";
import Loading from "./components/Loading";


function App() {
  const theme = useTheme();
  const temp = useTempUnit();
  

  return (
    <>
      <Router>
        {theme?.modeStatus === 'loading' && temp?.modeStatus === 'loading' && <Loading/>}
        {theme?.modeStatus !== 'loading' && temp?.modeStatus !== 'loading' &&
        <Container theme={theme?.themeData}>
          <Navbar/>
            <Switch>
                <Route path='/' exact component={HomePage}/>
                <Route path='/favorite-cities' component={FavesPage}/>
            </Switch>
        </Container>
      }
      </Router>
    </>
  );
}

export default App;
