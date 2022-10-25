import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { AppRoute } from '../../consts';
import LoginScreen from '../../pages/login-screen/login-screen';
import MainScreen from '../../pages/main-screen/main-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PropertyScreen from '../../pages/property-screen/property-screen';

type AppProps = {
  offersCount: number;
}

function App({offersCount}: AppProps): JSX.Element {
  return(
    <BrowserRouter>
      <Routes>
        <Route path = {AppRoute.Main} element = { <MainScreen offersCount = {offersCount}/> } />
        <Route path = {AppRoute.Login} element = { <LoginScreen/> } />
        <Route path = {AppRoute.Room} element = {<PropertyScreen/> } />
        <Route path = {AppRoute.Other} element = {<NotFoundScreen/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
