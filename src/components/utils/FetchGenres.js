import { Chip } from "@mui/material";
/************************************Movies Genres Finder *******************************************/
export const genreFinder =(genresApi) => {
    let genreArray = [] ;
    for(let i = 0; i< genresApi.length; i++){
      switch(genresApi[i]){
        case 28:
          genreArray.push(`Actionfilm`);
          break;
        case 12:
          genreArray.push(`Abenteuerfilm`);
          break;
        case 16:
          genreArray.push(`Animation`);
          break;
        case 16:
          genreArray.push(`Komädie`);
          break;
        case 80:
          genreArray.push(`Polizeifilm`);
          break;
        case 99:
          genreArray.push(`Dokumentarfilm`);
          break;
        case 99:
          genreArray.push(`Drama`);
          break;
        case 10751:
          genreArray.push(`Familienfilm`);
          break;
        case 14:
          genreArray.push(`Fantasie`);
          break;
        case 36:
          genreArray.push(`Historisch`);
          break;
        case 27:
          genreArray.push(`Horrorfilm`);
          break;
        case 10402:
          genreArray.push(`Musikfilm`);
          break;
        case 9648:
          genreArray.push(`Mysterium`);
          break;
        case 10749:
          genreArray.push(`Liebesfilm	`);
          break;
        case 878:
          genreArray.push(`Science-Fiction-Film`);
          break;
        case 10770:
          genreArray.push(`Tv-Film`);
          break;
        case 53:
          genreArray.push(`Thriller`);
          break;
        case 10752:
          genreArray.push(`Krieg`);
          break;
        case 37:
          genreArray.push(`Western`);
          break;
        default:
          break;
      }
    }
    return genreArray.map((genre) => <Chip  style = {{margin: "3px"}}key={genre} label= {genre} variant="outlined"  />);
    
    };