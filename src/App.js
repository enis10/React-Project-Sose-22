
import './App.css';
import {useContext} from 'react'
import FilmsPage from './pages/films-page/MoviesPage';
import Row from './components/Row/Row';
import Banner from './components/Banner/Banner';
import requests from './requests';
import Nav from './components/nav/Nav';
import {Switch, Route} from 'react-router-dom';
import Moviespage from './pages/films-page/MoviesPage';
import HomePage from './pages/home-page/HomePage';
import SignIn from './components/Authentifizierung/Authentifizierung';
import SucheSeite from './pages/suche-seite/SucheSeite';
import PostsSeite from './pages/PostsSeite/PostsSeite';
import{UserContext} from './context/context.jsx'
import UsersRanking from './components/UsersOverview/UsersRanking';
import MeinProfil from './pages/MeinProfil/MeinProfil.jsx'
import MyProfile from './components/MyProfile/MyProfile';
import { NewContext } from './context/newContext';
import KategorieFilter from './components/KategorieFilter/KatagerieFilter.compenent';
import TestMe from './components/MyProfile/TestMe';




function App() {
  const {currentUser} = useContext(UserContext);
  const {uid} = useContext(NewContext);

 
  return (
    <div className='body'>
  
  <Nav/>
  <Banner/>

   
  <Switch>
          <Route exact path='/' component={Moviespage} />
          <Route exact path='/homepage' component={Moviespage} />
          <Route  exact path= '/signin' component =  {currentUser ? Moviespage: SignIn}  />
          <Route  exact path= '/search' component = {SucheSeite}  />
          <Route  exact path= '/posts' component = {PostsSeite}  />

          {/***Wenn das der Benutzer eingeloggt ist dann ist die Seite Mein Profile zu
           zeigen wenn er sich ausloggt dann wird die HomePage angezeigt***/}
          {currentUser ? ( <Route  exact path= '/test' component = {MeinProfil}  />)

          :( <Route  exact path= '/test' component = {Moviespage}  />)}
          <Route  exact path= '/test' component = {MeinProfil}  />
          <Route  exact path= '/test2' component = {MyProfile}  />
          <Route exact path= '/test3' component = {KategorieFilter} />
          <Route exact path= '/test4' component = {(uid === "mainUser")? MeinProfil: TestMe} />
          
        </Switch>
   </div>
       
  );
}

export default App;