import React, {useContext, useEffect, useState} from 'react'
import { Link } from "react-router-dom";
import './gesuchteFilmen.styles.css'
import test from "../test/test";
import { NewContext } from '../../context/newContext';
import userEvent from '@testing-library/user-event';



const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';
const GesuchteFilme = ({movies}) => {
  const [movieId, setMovieId] = useState("")
  const {newValue, setNewValue, overView,setOverView, setVote,setTitle,
     setPosterPath, setTrailerUrl , setOpenAlert , setbackdropPath , setGesuchtMovie} = useContext(NewContext);


  const handleClick = (movie)=> {
    setNewValue(movie.id)
    setOverView(movie.overview)
    setVote(movie.vote_average)
    setTitle(movie.title)
    setPosterPath(movie.poster_path)
    setTrailerUrl('');
    setOpenAlert(false);
    setbackdropPath(movie.backdrop_path);
    setGesuchtMovie(movie)
   
  }

  


    return (
        <div className='row'>
    
       
    
        <div className='row_posters'>
        {
            movies.map(movie => (
              (movie.poster_path !== null) &&(
              <img 
               className='row_poster'
                src = {`${IMAGE_BASE_URL}${movie.poster_path}`} key = {movie.id} alt = {movie.name} 
              onClick= {()=> handleClick(movie)}     
                />)
            

            )) 
            }
        </div>


       
        </div>
      )
    }




export default GesuchteFilme;