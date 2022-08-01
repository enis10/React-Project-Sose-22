import react from "react";
import { Avatar } from "@mui/material";
import './UsersOverview.css'

const EinzigeBenutzer = ({userName, imageUrl, countPosts})=>{
   return(
       <div className="einziger_benutzer"> 
      <Avatar  className = "avatar" alt = {userName}  src= {imageUrl}/>
      <h3 className="link"><strong>{userName}</strong></h3>
       </div>
   );

}

export default EinzigeBenutzer