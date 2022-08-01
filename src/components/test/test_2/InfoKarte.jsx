import react , {useState, useContext,useEffect}from "react";
import './infoKarte.styles.css'
import { CircularProgressbar } from 'react-circular-progressbar';
import {GrFormAdd} from "react-icons/gr"
import {FaYoutube} from "react-icons/fa"
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import { NewContext } from '../../../context/newContext'
import { Alert ,Snackbar, Modal} from "@mui/material";
import Box from '@mui/material/Box';
import { Input } from "@mui/material";
import { Button } from "@mui/material";
import { async } from "@firebase/util";
import db from "../../utils/firebase.util";
import { addDoc, increment, onSnapshot, updateDoc} from "firebase/firestore";
import { collection ,doc,getDoc} from "firebase/firestore";
import { serverTimestamp, FieldValue ,setDoc} from "firebase/firestore";
import { genreFinder } from "../../utils/FetchGenres";
import { Rating } from "@mui/material";
import{UserContext} from '../../../context/context'
import 'firebase/firestore';
import { query } from "firebase/firestore";
import { where } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";
import { Tooltip } from "@mui/material";
import { verifyBeforeUpdateEmail } from "firebase/auth";




const InfoKarte = ({user,url,title,vote, overView,backdropP, genres, movieId})=>{

    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';
  
    const {trailerUrl, setTrailerUrl,openAlert, setOpenAlert} = useContext(NewContext);
    const{currentUser} = useContext(UserContext);
    
    const [countP, setCountP] = useState(0)
    const[open, setOpen] = useState(false);
    const[caption, setCaption] = useState('');
    const [value, setValue] = useState(null);
    const[engOv, setEnOv] = useState(true)
    const[already, setAlredy] = useState(false)
    const[keinOV, setKeinOV] = useState(false)
   

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      height:200 ,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
    

const opts = {
   height:"390",
   width: "80%",
   playerVars: {
      autoplay:1,
   }}
const handleClick = ()=>{
  
   if(trailerUrl){
      setTrailerUrl('')
    
     
   }else {
     
   movieTrailer(title ||'',{language : 'de'}).then((url) => {
      const urlParams = new URLSearchParams(new URL(url).search)
      setTrailerUrl(urlParams.get("v"))
      
   }).catch(error => setOpenAlert(true))
}

}


// Modals Functions

const handleUpload = async (e)  =>{

    addDoc(collection(db, "posts"), {
      imageUrl: backdropP,
      timestamp: serverTimestamp(),
      caption: caption,
      title: title,
      userName:currentUser.displayName,
      rating : value,
      uid:currentUser.uid,
      genres:genres,
      movieId: movieId
  
    }).then(   
   
      setDoc(doc(db,"users", String(currentUser.uid), "movies", String(movieId)), {
   
      movieTitle : title
    }).then(console.log("Efolgreich addiert")).then(setAlredy(false))
)


    /*jeder Benutzer hat eine bestimmte Anzahl an Posts*/
    const countDoc = doc(db, 'users', String(currentUser.uid))
     updateDoc(countDoc, {
      countPosts: increment(1)
    });
   

 
setOpen(false)
setAlredy(false)
  }


const verify = () =>{
  const collectionRef = collection(db,"users", String(currentUser.uid), "movies");
  let cnt = 0
   onSnapshot(collectionRef, snap => {
    snap.docs.forEach(docc => {
      
      if(docc.data().movieTitle == title ){
        cnt++
       setOpen(false)
       
      
      }
    }
 
    )
    if(cnt == 0){
      setOpen(true)
      setAlredy(false)
    }

  })
}



useEffect(()=> {
  if(overView.length <3){
    setKeinOV(true)
  }
      
  async function fetchData(){
      const request = await (await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=0b9f997ba8b82eaa161309a7c35655de&language=en-US`)).json(); 

    
      setEnOv(request.overview)
      return request;
      

  }
  fetchData();

  
},[`https://api.themoviedb.org/3/movie/${movieId}?api_key=0b9f997ba8b82eaa161309a7c35655de&language=en-US`]);

return(
    
       <div>
<Modal
  open={open}
  onClose={() => setOpen(false)}
  aria-labelledby="parent-modal-title"
  aria-describedby="parent-modal-description"
>
  <Box  sx={style}>
    <h2 id="parent-modal-title">Film empfehlen</h2>
   <form className="form">
   <Input  className = "inputForm"type = 'text' placeholder="Ihre Meinung üben den Film"  onChange={(e) => setCaption(e.target.value)} value = {caption}  />
   <Rating className="rating"  value={value}
  precision={1}
  onChange={(event, newValue) => {
    setValue(newValue);
  }}   />
   <Button className="button" onClick = {(e) => {handleUpload();  }   }>Empfehlen</Button>
   </form>
 
  </Box>
</Modal>


 {   (openAlert == true) && (
   <Snackbar open={openAlert} onClose= {() => setOpenAlert(false)} onClick = {() => setOpenAlert(false)}>
        <Alert  severity="error" sx={{ width: '100%' }}>
    {title} Trailer steht leider nicht zu verfügung
  </Alert>  
</Snackbar> 
 ) }

    <div className="filmKarte">
    <img 
                className="filmPoster"
                src = {url}  alt = {'beispiel'}     
                />
    <div className="filmInfos">
    <h2>{title}</h2>
    <div className="bewertung">
    <div className='progress'>
           <CircularProgressbar value={vote*10} text={`${vote*10}%`} /> 
           </div>
           <h2>Benutzerbewertung</h2>
           {currentUser && (<Tooltip title="Sie können einen Film nur einmal bewerten">
  <Button onClick={ ()=> {verify()}}>Bewerten</Button>
</Tooltip>)}
           
           <FaYoutube onClick={handleClick} className="trailer"/>
           <div className="genres">{genreFinder(genres)}</div>
       
    </div>
    {(overView.length > 3 )? (
      <span className="txtHandlung">{overView}</span>

    ):
    ( <span className="txtHandlung">{engOv}</span>)}
   
    </div>

    </div>


  { (trailerUrl) && (
     <center><YouTube className = 'youtubeBar'videoId= {trailerUrl} opts={opts}/></center>)}
     <Snackbar open={already} onClose= {() => setAlredy(false)}  autoHideDuration = {2000} >
    <Alert severity="error" sx={{ width: '100%' }}>
    Sie haben den Film {title} schon bewertet
  </Alert>  
</Snackbar>


{/*************Fall kein Overview gibt ***************/}
{(overView.length <3 ) && 
(
  <Snackbar open={keinOV} onClose={ () => setKeinOV(false)}  autoHideDuration = {4000} >
<Alert severity="info" sx={{ width: '100%' }}>
    Leider es gibt keine deutsche Handlung für den Film {title}
  </Alert>  
</Snackbar>
)}


       </div>
    );
}
export default InfoKarte;