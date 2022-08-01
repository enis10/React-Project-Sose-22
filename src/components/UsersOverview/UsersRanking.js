import { collection, onSnapshot , query, orderBy} from "firebase/firestore";
import db from "../utils/firebase.util";
import {useState, useEffect} from 'react'
import EinzigeBenutzer from "./EinzigeBenutzer";
import './UsersOverview.css'
const UsersRanking =  () => {
    const [users,setUsers] = useState([])
    const[topUser, setTopUser] = useState('')
    const[max, setMax] = useState(0);


    
useEffect (() =>{
    let unsubscribe

   { const collectionRef = collection(db, "users");
    const q = query(collectionRef,orderBy('countPosts', "desc"));
    unsubscribe = onSnapshot(q, ( snapshot)=>
{ setUsers(snapshot.docs.map(doc =>({... doc.data(), id: doc.id})));  })}
return() =>{
    unsubscribe();
}
},[])


    return (
    <div className="overview">
    <h3 className="link">Top Benutzer</h3>
 {
     users.map(user => (<EinzigeBenutzer   key = {user.id} userName = {user.displayName} imageUrl= {user.imageUrl} /> ))
 }
   </div>
    );
}

export default UsersRanking;