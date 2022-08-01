import { Avatar } from "@mui/material";
import react , {useContext, useState, useEffect} from "react";
import './MyProfile.css'
import { UserContext } from "../../context/context";
import { Modal , Box, Button,TextField, Input} from "@mui/material";
import { onSnapshot } from "firebase/firestore";
import { storage, db } from "../utils/firebase.util";
import { doc,updateDoc } from "firebase/firestore";
import { uploadBytesResumable, ref, } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import {BiMessageAltDetail}  from "react-icons/bi"


const MyProfile = () => {

    
    const{currentUser} = useContext(UserContext);
    const[profileImg, setProfileImg] = useState('');
    const[open, setOpen] = useState(false);
    const [image, setImage] = useState('');
    // nicht benötigt nur als Beispiel gegeben
    const [progress, setProgress] = useState(0);


    const [cntPosts, setcntPost] = useState(null);

    //About me Section
    const[open2, setOpen2] = useState(false);

    const[text, setText] = useState('')
    const [txt, setTxt] = useState (null)





    /*******************************Pop Ups Styling ***************************'*/

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height:130 ,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    /*******************************Pop Ups Styling ***************************'*/
    const style2 = {
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


 /*******************************Profile Bild Hochladen ***************************'*/
const handleUpload  = () =>{
    // storage ist ein Firebase Cloud Service für entwechler
    const storageRef= ref(storage,`profileImages/${String(currentUser.uid)}`)
    //das hochgeladenes Bild beim Cloud speichern
    const uploadTask = uploadBytesResumable(storageRef, image);
    // Scritte des Hochladens
    uploadTask.on('state_changed', (snapshot) => 
    {    
        const prog = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
        setProgress(prog)
    }, (err) => console.log(err), 
    //URL des hochgeladenes Bild
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url =>  {
            
         // URL des hochgeladenes im User Dokument speichern
            updateDoc(doc(db, 'users', String(currentUser.uid)), {
             profileImgUrl: url
           });
        }) } );
setProgress(0);
setImage(null);
setOpen(false)};

/****************Bild vom Computer hochladen *************************/
const handleChange = (e) =>{
    if(e.target.files[0]){
        setImage(e.target.files[0]);
    } }



/***************************************** UseEffect ***********************************/

useEffect(() =>{

  const docRef = doc(db,"users",String(currentUser.uid))
  onSnapshot(docRef, snap => {
      setTxt(snap.data().aboutme)
  })
    //fetch the Url profile image form the User Document and set it as Profile image
    const urlImgDoc = doc(db, 'users', String(currentUser.uid))
    const unsub = onSnapshot(urlImgDoc, (doc) => {
    setProfileImg(doc.data().profileImgUrl);
    setcntPost(doc.data().countPosts);
    });

})




//############################upload about me txt#######################
const  handleClick2 = () => {
  updateDoc(doc(db, 'users', String(currentUser.uid)), {
    aboutme: text
  });
  setOpen2(false)

}








    //####################################### Return ###########################################
    return(
    <div>



{/************************************** This is PoP Up Stuff *********************************/}
<Modal
  open={open}
  onClose={() => {setOpen(false)}}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description">
  <Box sx={style}>
  <center className= "inside_Box">
 <h3>Profil Bild Hochladen</h3>
 <input type = 'file' onChange = {handleChange} />
 <Button className="hochladen_button" onClick = {handleUpload}>Hochladen</Button>
 </center>
  </Box>
</Modal>
{/************************************** ^This is PoP Up Stuff ^*********************************/}




{/****************************Popup for about me Section *****************************/}
<Modal
  open={open2}
 
  onClose={() => {setOpen2(false)}}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description">
  <Box sx={style2}>
  <center className= "inside_Box">

  <TextField
  multiline
  rows={4}
  columns = {4}
  onChange = { e => {setText (e.target.value)}}
/>
<div className="hochladen_button">
<Button className="hochladen_button"  onClick = {() => handleClick2()}>Hochladen</Button>
</div>
 
 </center>
  </Box>
</Modal>
{/****************************Popup for about me Section *****************************/}


    <div className="avatar_n_name">
    {/******wenn man auf das Avatar klickt dann wird ein Pop Up eingeblendet der die Moglichkeit gibt das Foto zu tauschen evt.Hochladen *********/}
    <Avatar  sx={{ width: 70, height: 70 }} className = "avatar" onClick = {() => {setOpen(true)}}  src = {profileImg} />
    <h3 className="name"><strong>{currentUser.displayName}</strong></h3>
    <h3 className="cnt_posts">Total Posts: {cntPosts}</h3>

    {/*** Muss man darauf Klicken um  eine Beschreibung über sich selbst abzugeben******/}
    <BiMessageAltDetail  onClick={()=> {setOpen2(true)}}  className="message"/>
    </div>

   {txt &&(
    <div className="aboutme">
  
   <h3 className="txtt"> {txt}</h3>
   </div>
   )}

    </div>
    
   );
    }
export default MyProfile;