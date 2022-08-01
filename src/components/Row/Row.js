import axios from 'axios';
import React, {useState, useEffect, useContext} from 'react'

import FilmCard from '../film-item/film-item.component';
import './Row.styles.css'
import {NewContext} from '../../context/newContext'



function Row({title, fetchUrl, isLargeRow, action}) {

    const [movies, setMovies]= useState([]);
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';
    const {newValue, setNewValue, overView,setOverView, setVote,setTitle,
      setPosterPath, setTrailerUrl , setOpenAlert , setbackdropPath , setMovie, setGesuchtMovie,
      trailerUrl,bannerContext, setBannerContext } = useContext(NewContext);
  

    useEffect(()=> {
      
        async function fetchData(){
            const request = await (await fetch(fetchUrl)).json(); /* Information warten */
            console.log(request);

          
            setMovies(request.results)
            return request;
            

        }
        fetchData();
        
    },[fetchUrl]);

 
 /*********Interaktion mit den Movies aus der SucheSeite*************/
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

    /********Interaktion mit den Movies aus  der HomePage ***********/
    const handleClick2 = (movie,o)=>{
      setMovie(movie)
      setTrailerUrl('');
      console.log(o)
    
    

    
      
    }
   

  return (
    <div className='row'>

    <h2>{title}</h2>

    <div className='row_posters'>
    {
        movies.map(movie => (
          <img 
            onClick={(e) => action == "search"? handleClick(movie) : handleClick2(movie, e.target )} 
            className = {`row_poster ${isLargeRow && 'row_poster_large'}`}
            src = {`${IMAGE_BASE_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} key = {movie.id} alt = {movie.name} />
        )) }
    

    </div>

 
   
    </div>
  )
}

export default Row
