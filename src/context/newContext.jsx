
import { createContext, useState} from "react";

export const NewContext = createContext({
    currentUser:null,
    setCurrentUser :() => null,

});


export const NewProvider = ({children}) => {
    const[newValue, setNewValue] = useState(null);
    const[overView, setOverView]= useState(null);
    const[vote, setVote] = useState(null);
    const[title, setTitle] = useState(null);
    const[posterPath, setPosterPath]  = useState(null);
    const [trailerUrl, setTrailerUrl] = useState('');
    const[openAlert, setOpenAlert] = useState(false);
    const [backdropPath, setbackdropPath] = useState('');
    const [movie, setMovie] = useState(null)
    const [showMyProfile, setShowMyProfile] = useState(null)
    const [gesuchtMovie, setGesuchtMovie] = useState(null);

    //***********jeder Kontext hat eine bestimmte Anforderung für Banner************/
    const [bannerContext, setBannerContext] = useState(null);


    //***der Benutzer kann einen Bestimmten Film aus den Posts wählen, die Informationen über den Film werden später in einer Seite angezeigt ******/
    const [fromPostMovie, setFromPostsMovie] = useState(null);
    const [uid,setUid] = useState(null);


    const value = {newValue, setNewValue, overView,setOverView, setVote,vote, setTitle, title,posterPath, setPosterPath
         ,trailerUrl, setTrailerUrl,openAlert, setOpenAlert , backdropPath, setbackdropPath, movie, setMovie,showMyProfile,
          setShowMyProfile,gesuchtMovie, setGesuchtMovie, bannerContext, setBannerContext,fromPostMovie, setFromPostsMovie
        ,uid,setUid};
    return <NewContext.Provider value={value}>{children}</NewContext.Provider>

}