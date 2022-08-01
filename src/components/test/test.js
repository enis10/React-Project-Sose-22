import React, {useContext, useEffect, useState} from 'react'
import './infosFilm.styles.css'

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { NewContext } from '../../context/newContext';
import Row from '../Row/Row'
import InfoKarte from './test_2/InfoKarte';
import './test_2/sucheErgebnis.styles.css'
import { UserContext } from '../../context/context';
import { Alert, AlertTitle } from '@mui/material';


const EmptyPage = () => {
const {newValue, overView,vote,title, posterPath,backdropPath, gesuchtMovie}= useContext(NewContext);
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';
const R_URL = `https://api.themoviedb.org/3/movie/${newValue}/recommendations?api_key=0b9f997ba8b82eaa161309a7c35655de&language=de&page=1`
const{currentUser,} = useContext(UserContext);





    return(
        <div>{ (newValue !== null )? (
            
             <div className='displayErgebnis'> 
             <InfoKarte  user = {currentUser} genres = {gesuchtMovie.genre_ids} 
             movieId = {gesuchtMovie.id}
             backdropP = {`${IMAGE_BASE_URL}${backdropPath}`} url = {`${IMAGE_BASE_URL}${posterPath}`} title = {title} vote = {vote} overView ={overView} />

             <Row action ='search' title= {'Ähnliche Filme'} fetchUrl={R_URL} isLargeRow/>

              </div>) :(
                  
                <Alert  className = "alert" severity="info">
  <AlertTitle>Info</AlertTitle>
  Sie können in dieser Seite einen beliebten Film suchen — <strong>Probieren Sie es!</strong>
</Alert>)
        }
              </div>
               );
}

export default EmptyPage;