import { Rating } from "@mui/material";
import react from "react"
import {useState} from 'react'

const RatingStarts = () =>{
    const[value, setValue] = useState(null);
    console.log(value);


    return(
        <div>
<Rating
  value={value}
  precision={0.5}
  onChange={(event, newValue) => {
    setValue(newValue);
  }}   
/>
        </div>
    );
}

export default RatingStarts;
