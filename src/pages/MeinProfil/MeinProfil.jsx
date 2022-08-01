import react , {useContext, useState, useEffect} from "react";
import { UserContext } from "../../context/context";
import db from "../../components/utils/firebase.util";
import { collection, doc, setDoc,query, where, onSnapshot  } from "firebase/firestore"; 
import Post from "../../components/post/Post";
import MyProfile from "../../components/MyProfile/MyProfile";
import './MeinProfil.css'


const Meinprofil = () =>{
   const{currentUser} = useContext(UserContext);
   const [myPosts, setMyposts] = useState([]);
     
    useEffect( () => {

        const  posts = collection(db, "posts");
        const q = query(posts, where("uid", "==", String(currentUser.uid)));

     onSnapshot(q, ( snapshot)=>
    { setMyposts(snapshot.docs.map(doc =>({... doc.data(), id: doc.id})));  })
  })

    return(
     <div>

<MyProfile/>



    <div className="post_container">
    { myPosts.map( post  => <Post  key = {post.id}  userName = {currentUser.displayName}  userId = {currentUser.uid}
    genres = {post.genres}
     caption ={post.caption} imageUrl = {post.imageUrl} title = {post.title} rating = {post.rating} postId = {post.id} /> )}
    </div>
    </div>);
}

export default Meinprofil;