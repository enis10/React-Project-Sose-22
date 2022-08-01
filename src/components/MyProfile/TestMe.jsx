import react, {useState, useEffect, useContext} from "react";
import YourProfile from "./YourProfile";
import db from "../utils/firebase.util";
import { collection } from "firebase/firestore";
import { query } from "firebase/firestore";
import { where , onSnapshot} from "firebase/firestore";
import Post from "../post/Post";
import { NewContext } from "../../context/newContext";

const TestMe = () => {
    const [myPosts, setMyposts] = useState([]);
    const[aboutme, setAboutMe]  = useState(null);
    const [txt,setTxt] = useState(null);
    const {uid} = useContext(NewContext);

    useEffect( () => {

     

        const  posts = collection(db, "posts");
        const q = query(posts, where("uid", "==", String(uid)));

     onSnapshot(q, ( snapshot)=>
    { setMyposts(snapshot.docs.map(doc =>({... doc.data(), id: doc.id})));  })
  
    })
    return(
        <div>
            <YourProfile uid = {uid} />
          
            <div className="post_container">
    { myPosts.map( post  => <Post  key = {post.id}  userName = {post.userName}  userId = {post.uid}
    genres = {post.genres}
     caption ={post.caption} imageUrl = {post.imageUrl} title = {post.title} rating = {post.rating} postId = {post.id} /> )}
    </div>
        </div>
    )
}

export default TestMe;