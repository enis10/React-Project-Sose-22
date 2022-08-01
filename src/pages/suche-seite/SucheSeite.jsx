import React from "react";
import {useState, useEffect} from "react";
import './SucheSeite.styles.css'
import GesuchteFilme from "../../components/gesuchte-Filmen/gesuchteFilmen.component";
import EmptyPage from "../../components/test/test";




const SucheSeite = () => {
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
  
    const onChange = (e) => {
      e.preventDefault();
  
      setQuery(e.target.value);
  
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=0b9f997ba8b82eaa161309a7c35655de&language=de&page=1&include_adult=false&query=${e.target.value}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (!data.errors) {
            setResults(data.results);
          } else {
            setResults([]);
          }
        });
    };


  
    return (
      <div className="suche-seite" >
      
          

              <input className="suche-input"
                type="text"
                placeholder="Film suchen..."
                value={query}
                onChange={onChange}
              />
                     
            {results.length > 0 && (


     <div className='row_posters'>

    {
        <GesuchteFilme movies = {results} />
      }   

    </div>    
            )}
            <EmptyPage/>
        </div>
      
    );

    }
export default SucheSeite;