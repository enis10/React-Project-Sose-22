import react , {useState, useEffect, useContext} from "react";
import db from "../utils/firebase.util";
import { addDoc, collection, onSnapshot , query, orderBy, serverTimestamp, deleteDoc, getDoc,getDocs,doc,FieldValue, updateDoc,increment} from "firebase/firestore";
import './Post.styles.css'
import { Link } from 'react-router-dom';
import { Rating,Input ,Avatar,Chip } from "@mui/material";
import { UserContext } from "../../context/context";
import { MdDelete } from "react-icons/md";
import { toHaveAccessibleDescription } from "@testing-library/jest-dom/dist/matchers";
import { NewContext } from "../../context/newContext";
import { genreFinder } from "../utils/FetchGenres";


const Post = ({userName, userId,caption, imageUrl,title, rating, postId , genres, movieId}) => {
    const [comments, setComments] = useState([]);
    const[comment, setComment] = useState('')
    const[profileImgUrl, setProfileImgUrl] = useState(null); //Profil Bild des Benutzers der einen Beitrag postet
    const{currentUser} = useContext(UserContext);
    const{uid,setUid} = useContext(NewContext);

    const[id,setId] = useState(null);

    const {fromPostMovie, setFromPostsMovie}  = useContext(NewContext)

    useEffect( () => {
      let unsubscribe, unsubscribe2;
    
    
     {   
      const collectionRef = collection(db,"posts",String(postId), "comments");
      const docRef = doc(db,"users",String(userId))

      const q = query(collectionRef,orderBy("timestamp", "desc"));
     
      unsubscribe = onSnapshot(q, ( snapshot)=>
      {setComments(snapshot.docs.map(doc =>({... doc.data(), id: doc.id, postId : postId}))); })
      unsubscribe2= onSnapshot(docRef,(snap) => 
      {
        setProfileImgUrl(snap.data().profileImgUrl)
      })
    }
    
    return() => {unsubscribe();
                 unsubscribe2()};

    },[]);
    const postComment = (e) => {
        e.preventDefault();
        addDoc(collection(db, "posts", postId, "comments"), {
          text: comment,
          userName : currentUser.displayName,
          uid: currentUser.uid,
          timestamp: serverTimestamp(),
        }).then(() => setComment(''));

 
        const countDoc = doc(db, 'users', String(currentUser.uid))
        updateDoc(countDoc, {
         countComments: increment(1)
       });
       
    
      }
  const removeComment  = (comment) =>{
    const docc=doc(db,"posts",String(comment.postId),"comments",String(comment.id));
  
      deleteDoc(docc)
      const countDoc = doc(db, 'users', String(currentUser.uid))
      updateDoc(countDoc, {
       countComments: increment(-1)
     });
    
    }

    const removePost = () =>{
      const docP = doc(db, 'posts',String(postId))
      deleteDoc(docP)
      const countDoc = doc(db, 'users', String(currentUser.uid))
      updateDoc(countDoc, {
        countPosts: increment(-1)
      });
      deleteDoc(doc(db,"users", String(currentUser.uid), "movies", String(movieId)));
    
    }
//*****************InfoSeite vorbereiten******************/



    return(
        <div className="post">
        <div className="post_header">
        {currentUser ? (
          <Link to= '/test4' ><Avatar alt={userId} src={profileImgUrl} onClick = {() =>{ (userId ===currentUser.uid )? setUid("mainUser"): setUid(userId)} }  /></Link>
          ):
          (<Avatar alt={userId} src={profileImgUrl}   />)
          }

       
        <h3 className="benutzer"><strong>{userName} </strong>hat <strong>{title}</strong> bewertet</h3>
        {(currentUser) && (currentUser.uid === userId) &&
        (<MdDelete   className = "Md"size = {25} onClick={(e)=> (removePost())}/>)}
        </div>


        {/***************Wenn man auf das Bild anklickt wird die Infos Seite angezeigt**************/}
 <img  className="post_image" src = {imageUrl}  />
 <div>{genreFinder(genres)}</div>

        <h3  className="post_text" > <strong>{userName}: </strong>{caption}</h3>
        <Rating name="simple-controlled" readOnly className="bewertung" value={rating}/>

    
        
        <div className='post_comments'>
      {
        comments.map( comment => ( 
          <div key={comment.id}>
          

          <p className="kommentar_container" key = {comment.id}>
            <b className="kommentar">{comment.userName}</b> {comment.text}
           
        
          {(currentUser) && (currentUser.uid == comment.uid) && (
            <MdDelete className="delete" onClick={(e) => removeComment(comment)}  />
        
           
          )}
          </p>
          
          </div>
        ))
      }
    </div>
       {(currentUser != null) && 
       (
        <form className="post_commentBox"> 
        <Input className="post_input" placeholder="Kommentar Posten" type = "text" value = {comment} 
        onChange = {(e) => setComment(e.target.value)} />
        <button
disabled ={!comment}
 type = "submit"
 onClick={postComment}
className='post_button'>Posten</button>

 </form>
      ) } 
      
        </div>
    );
}
export default Post;