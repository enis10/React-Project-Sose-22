import React from "react";
import { useState , useContext} from "react";
import FormInput from "../form-input/form-input.component";
import './sign-up.styles.scss'
import Button from "../button/button.component";
import { createAuthUserWithEmailAndPassword,signInWithGooglePopup, createUserDocumentFromAuth, 
    signInAthUserWithEmailAndPassword } from "../utils/firebase.util";
import { UserContext } from "../../context/context";
import { auth } from "../utils/firebase.util";
import { signInWithEmailAndPassword } from "firebase/auth";
const defaultFormFields = {

    
    email : '',
    password : '',

}

const  LogInpForm = () =>{




const [formFields, setFormFields] = useState(defaultFormFields);
const { email,password} = formFields;

const{setCurrentUser}  = useContext(UserContext)
;
const signInWithGoogle = async()=>{
    const {user} = await signInWithGooglePopup(); // Antwort der Methode, die erlaub dem Benutzer erlaubt mir google anzumelden
    const userDocRef = await createUserDocumentFromAuth(user); // Dokument erstellen
    setCurrentUser(user);

};

const resetFormields = () =>{
    setFormFields(defaultFormFields)  ;

}

const handleChange = (event) => {

    const {name, value} = event.target;
   setFormFields({...formFields, [name]:value});

}

const handleSubmit = async (event) =>{
    event.preventDefault();
  
    try{
        let user
         user  =   await signInWithEmailAndPassword(auth, email, password);
        console.log(user.user);
        alert('Erfolgreich eingelogt')
        setCurrentUser(user.user);
        
        resetFormields();
        return() => {user();}
    }catch(e){
        if (e.code == 'auth/wrong-password')
        {alert("Falsche Passwort");
        return;}

        else if(e.code ==="auth/user-not-found")
        {alert("Benutzer nicht gefunden")
        return;}

        console.log(e);
      }
     
}

  
  
  
  return(
    <div className = 'sign-up-container'>
    <h2>Habe schon ein Konto</h2>
   <span>Mit Email und Passwort registrieren</span>
   <form onSubmit = {handleSubmit}>


   <FormInput type = "email" required   label = "Email"  onChange = {handleChange}  name = "email" value = {email}/>

   <FormInput type = "password" required  label = "Password" onChange = {handleChange}  name = "password" value = {password}/>

<div className="buttons-container">
<Button type = 'submit'>LogIn </Button>

</div>

   </form>
 </div>

  );

}
export default LogInpForm;