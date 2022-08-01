import react, {useState, useEffect} from "react";
import { Autocomplete,TextField } from "@mui/material";
import { sendSignInLinkToEmail } from "firebase/auth";
import { Chip } from "@mui/material";
import '../../pages/PostsSeite/postSeite.style.css'





const KategorieFilter  =({setFiltered, all, setKategorie, kategorie, genreId, setGenreId})  => {

    const[timeSlots, setTimeSlots] = useState(["Alle" ,"Actionfilm","Abenteuerfilm", `Animation`,`Komädie`,"Polizeifilm",`Dokumentarfilm`,`Drama`,
    `Familienfilm`,`Fantasie`,`Historisch`,`Horrorfilm`,`Musikfilm`,`Mysterium`,`Liebesfilm`,`Science-Fiction-Film`,
    `Tv-Film`,`Thriller`,`Krieg`,`Western`
])




  useEffect(() => {
      
      if (kategorie === 0){
         
          setFiltered(all)  
          return;
      }
      else {const filtered  = all.filter (post =>
        post.genres.includes(kategorie))
        
        setFiltered(filtered)
      }
  },[kategorie])




//****Hardcode  SearchBar Output */
  const FetchGenre = (s) =>{
      setGenreId(s)
      if((s === "Alle" ) || (s==="")){
          setKategorie(0)
          setGenreId("Alle")
      }
      else if (s == "Actionfilm"){
          setKategorie(28)
      }
      else if (s == "Abenteuerfilm"){
        setKategorie(12)
    }
    else if (s == "Animation"){
        setKategorie(16)
    }
    else if (s == "Komädie"){
        setKategorie(16)
    }
    else if (s == "Polizeifilm"){
        setKategorie(80)
    }
    else if (s == "Dokumentarfilm"){
        setKategorie(99)
    }
    else if (s == "Drama"){
        setKategorie(99)
    }
    else if (s == "Familienfilm"){
        setKategorie(10751)
    }
    else if (s == "Fantasie"){
        setKategorie(14)
    }
    else if (s == "Historisch"){
        setKategorie(36)
    }
    else if (s == "Horrorfilm"){
        setKategorie(27)
    }
    else if (s == "Musikfilm"){
        setKategorie(10402)
    }
    else if (s == "Mysterium"){
        setKategorie(9648)
    }
    else if (s == "Liebesfilm"){
        setKategorie(10749)
    }
    else if (s == `Science-Fiction-Film`){
        setKategorie(878)

    }
    else if (s == "Tv-Film`"){
        setKategorie(10770)
    }
    else if (s == "Thriller"){
        setKategorie(53)
    }
    else if (s == "Krieg"){
        setKategorie(10752)
    }
    else if (s == "Western"){
        setKategorie(37)
    }
  } 


    return(
        <div>
<Autocomplete
  disablePortal

  id="combo-box-demo"
  options={timeSlots}
  sx={{ width: 300 }}
  
  renderInput={(params) => <TextField {...params} label="Filmenkategorie" 
  
  onSelect =  {(val) => {FetchGenre(val.target.value)}}
  
  />}
/>
{genreId &&


(   <div className="chip">
   <Chip  className="chip" style = {{margin: "3px"}}label= {genreId} variant="outlined"  /> </div>
   )}

        </div>
    )
}
export default KategorieFilter;
