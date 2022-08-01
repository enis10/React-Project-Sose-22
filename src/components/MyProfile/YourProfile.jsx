import react, {useEffect, useState} from "react";
import { onSnapshot,doc, collection,query,where } from "firebase/firestore";
import db from "../utils/firebase.util";
import { Avatar } from "@mui/material";
import './MyProfile.css'
import Post from "../post/Post";

const YourProfile = ({uid}) => {
    const[profileImg, setProfileImg] = useState('');
   


    const [cntPosts, setcntPost] = useState(null);

    //About me Section
    const[displayName, setDisplayName] = useState(false);

  
    const [txt, setTxt] = useState (null)
    const[yourPosts, setYourPosts]= useState (null)




    useEffect(() =>{


  


        //fetch the Url profile image form the User Document and set it as Profile image
        const urlImgDoc = doc(db, 'users', String(uid))
        const unsub = onSnapshot(urlImgDoc, (doc) => {
        setProfileImg(doc.data().profileImgUrl);
        setcntPost(doc.data().countPosts);
        setTxt(doc.data().aboutme)
        setDisplayName(doc.data().displayName)
        });
    
    })
    return(
        <div>
        <div className="avatar_n_name">
    <Avatar  sx={{ width: 70, height: 70 }} className = "avatar" src = {profileImg} />
    <h3 className="name"><strong>{displayName}</strong></h3>
    <h3 className="cnt_posts">Total Posts: {cntPosts}</h3>
        </div>
        {txt &&(
    <div className="aboutme">
  
   <h3 className="txtt"> {txt}</h3>
   </div>
   )}


        </div>
        
    )
}
    
 


export default YourProfile;