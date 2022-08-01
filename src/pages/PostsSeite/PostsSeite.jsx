import { collection, onSnapshot , query, orderBy} from "firebase/firestore";
import react, {useState, useEffect,useContext} from "react";
import Post from "../../components/post/Post";
import UsersRanking from "../../components/UsersOverview/UsersRanking";
import db from "../../components/utils/firebase.util";
import './postSeite.style.css'
import { NewContext } from "../../context/newContext";
import KategorieFilter from "../../components/KategorieFilter/KatagerieFilter.compenent";
import { Rating ,TextField} from "@mui/material";
const PostsSeite = () =>{


 const[posts, setPosts] = useState([]);
 const [filtered, setFiltered] = useState([])
 const[activeGenre, setActiveGenre] = useState(0);
 const[genreId, setGenreId]= useState(null)

 //*********Rating value***********/
 const [value, setValue] = useState(1);


useEffect(  () => {

   
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef,orderBy("timestamp", "desc"));
  
    onSnapshot(q, ( snapshot)=>
    { setPosts(snapshot.docs.map(doc =>({... doc.data(), id: doc.id})));  })
    
  

  },[]);




return(


<div className="post_page">

   <div className="posts">

   <div className="filter">

{/*********Filter Krieterien**********/}
  <div className="rating">
  <Rating
  name="simple-controlled"
  value={value}
  onChange={(event, newValue) => {
    setValue(newValue);
  }}
/>
<h3 className="text"><strong>Mindestbewertung </strong></h3>
  </div>
   <KategorieFilter  setFiltered = {setFiltered}
   kategorie = {activeGenre}
   setKategorie = {setActiveGenre}
   genreId = {genreId}
   setGenreId = {setGenreId}
    all = {posts}/>
   </div>
 

 
  {   (activeGenre === 0)?
  (
      posts.filter(post => post.rating >= value).map( post => (<Post key = {post.id} 
      userId= {post.uid} rating= {post.rating} 
      postId ={post.id} userName={post.userName} 
      genres = {post.genres}
      caption= {post.caption} title = {post.title} 
      movieId = {post.movieId}
      imageUrl= {post.imageUrl} />))
  ):
  (filtered.length > 0?
    (filtered.filter(post => post.rating >= value).map( post => (<Post key = {post.id} 
      userId= {post.uid} rating= {post.rating} 
      postId ={post.id} userName={post.userName} 
      genres = {post.genres}
      caption= {post.caption} title = {post.title} 
      movieId = {post.movieId}
      imageUrl= {post.imageUrl} />)))
      :(
        <h3>no Movies in the {genreId} categorie</h3>
      )
      
      )
    
  }
  </div>
 



</div>
);
}
export default PostsSeite;