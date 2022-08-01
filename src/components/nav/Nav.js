import React, {useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import './nav.css'
import{UserContext,} from '../../context/context'
import{signOutUser} from '../utils/firebase.util'
import { NewContext } from '../../context/newContext';

function Nav() {
  const{currentUser,setCurrentUser} = useContext(UserContext);
  
  const signOutHandler = async () =>{
      await signOutUser();
      setCurrentUser(null) 
      
    }

  const[show,handleShow] = useState(false);

  useEffect(()=>{
    window.addEventListener("scroll", ()=>{
      if( window.scrollY >100){
        handleShow(true);
      }else handleShow(false);
    });
    return ()=>{
      window.removeEventListener("scroll");
    }

  },[]);

  return (
    <div className=  {`nav ${show && "nav_scrolled"}`}>
        
        <Link  className='nav_hm' to = '/homepage'>Homepage</Link>
        {/***************************Mein Profil **********************/}
        {currentUser && (<Link className='nav_mp' to = '/test'>Mein Profil</Link>)}

        
        <Link className={`nav_regester ${currentUser && "fsConnected"}`} to='/search'>Film Suchen</Link>
        <Link className={`nav_posts ${currentUser && "nvConnected"}`} to='/posts'>Posts</Link>
        {
          currentUser ? (
            <><span className='nav_log_in' onClick={signOutHandler}>Ausloggen</span></>)
            :(
            <><Link className='nav_log_in' to='/signin'>Login</Link></>
          )
        }
       
       
        
            
 
    </div>
    
  )
}

export default Nav