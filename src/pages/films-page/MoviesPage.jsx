import React, {useContext, useEffect} from 'react'
import requests from '../../requests';
import Row from '../../components/Row/Row';
import GesuchteFilme from '../../components/gesuchte-Filmen/gesuchteFilmen.component';
import {NewContext} from '../../context/newContext'
import InfoKarte from '../../components/test/test_2/InfoKarte';
import { Modal } from '@mui/material';

function Moviespage() {
  const {movie, currentUser, } = useContext(NewContext);

  
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';
  return (
      <div>
    {
      (movie)&& (

        <InfoKarte  user = {currentUser} url ={`${IMAGE_BASE_URL}${movie.poster_path}`}title = {movie.title} genres = {movie.genre_ids}
         vote = {movie.vote_average} overView = {movie.overview} 
        backdropP = {`${IMAGE_BASE_URL}${movie.backdrop_path}`}  movieId = {movie.id} />
      )
    }
    <Row title = 'Tendenzen ' fetchUrl = {requests.fetchTrending}
     isLargeRow
     />
     <Row title= {'Bestbewertet'} fetchUrl={requests.fetchTopRated}
     isLargeRow/>
     <Row title= {'Beliebt'} fetchUrl={requests.fetchPolular}
     isLargeRow/>


   
     
     </div>
  )
}

export default Moviespage;