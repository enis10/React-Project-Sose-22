import React, {useState,useEffect, useContext} from 'react'
import requests from '../../requests';
import './banner.styles.css'
import movieTrailer from 'movie-trailer';
import YouTube from 'react-youtube';
import { Modal, Box,Alert ,Snackbar} from '@mui/material';
import Movies4Banner from '../../Movies4Banner'
import { NewContext } from '../../context/newContext';
import Context from '@mui/base/TabsUnstyled/TabsContext';

function Banner() {
  const[trailerUrl, setTrailerUrl] = useState('');
  const [movie,setMovie]= useState([]);
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  //***************Movies page selected from Posts Page context */
  const {bannerContext, } = useContext(NewContext);
  useEffect(()=>   {

  /*  async function fetchData(){
  
     // const request = await (await fetch(requests.fetchPolular)).json();
 
    
     // return request;
      } 
   
    fetchData(); */

    if (bannerContext == null){

    setMovie(Movies4Banner[Math.floor(Math.random() * Movies4Banner.length)]);
  }
  else if (bannerContext == 'selectedPost'){
    setMovie(Movies4Banner[0])
    
  }

     
   
  },[bannerContext]); // everytimes bannerCustom changes 


  const handleClick = ()=>{
  
    if(trailerUrl){
       setTrailerUrl('')
     
      
    }else {
      
    movieTrailer(movie.title ||'' , {language : 'de'}).then((url) => {
       const urlParams = new URLSearchParams(new URL(url).search)
       setTrailerUrl(urlParams.get("v"))
       setOpen(true)   
    }).catch(error => setOpenAlert(true))
 }
 }
  const handleClose = () =>{
    setTrailerUrl('')
    setOpen(false)
  }

  const opts = {
    height:"390",
    width: "90%",
    playerVars: {
       autoplay:1,
    }}
  return (
    <header
    className='banner'
    style ={{
      backgroundSize: "cover",
      backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`, /*  movie?  bedeutet dass die app nicht zerstört ist wenn
       überhaupt kein Data in der json datei gibt*/
      backgroundPosition: 'center center',

    }}
    
    >
      <Snackbar open={openAlert} onClose= {() => setOpenAlert(false)}  autoHideDuration = {2000} onClick = {() => setOpenAlert(false)}>
    <Alert severity="error" sx={{ width: '100%' }}>
    {movie.title} Trailer steht leider nicht zu verfügung
  </Alert>  
</Snackbar>
    <div className='banner_contents'>
    <h1 className='banner_title'>{movie?.title || movie?.name || movie?.original_name}</h1> {/* wenn kein title im json Datei vohanden ist dann name oder original_name */}

    <div className='bunner_bouttons'>
    <button className='banner_button' onClick={handleClick}>Trailer</button>
  

    </div>


    </div>
    {open &&(
      
      <Modal
  open={open}
  onClose={handleClose}
  
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box >
  <center><YouTube className = 'youtubeBar'videoId= {trailerUrl} opts = {opts} /></center>
  </Box>

</Modal>
   )
    }
  
    </header>

  )
}

export default Banner