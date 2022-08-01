import React from "react";
import { useState , useContext} from "react";
import FormInput from "../form-input/form-input.component";
import './sign-up.styles.scss'
import Button from "../button/button.component";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../utils/firebase.util";
import { updateProfile } from "firebase/auth";
import { UserContext } from "../../context/context";
const defaultFormFields = {
    displayName :'',
    email : '',
    password : '',
    confirmPassword : '',

}

const  SignUpForm = () =>{
const [formFields, setFormFields] = useState(defaultFormFields);
const {displayName, email,password,confirmPassword} = formFields;
const {setCurrentUser} = useContext(UserContext);
const resetFormields = () =>{
    setFormFields(defaultFormFields)  ;

}

const handleChange = (event) => {

    const {name, value} = event.target;
   setFormFields({...formFields, [name]:value});

}

const handleSubmit = async (event) =>{
    event.preventDefault();
    if ( password !== confirmPassword){
     alert("Passwords do not match")
     return ;
    }
    try{

        const {user} = await createAuthUserWithEmailAndPassword(email, password); /* {user} = response.user */
        updateProfile(user, {
            displayName: displayName
          })
        
        console.log(user);
        setCurrentUser(user);
        await createUserDocumentFromAuth(user,{displayName})
        
        resetFormields();
    }catch(e){
        if(e.code == 'auth/email-already-in-use'){
            alert('  Benutzer mit der eingegebenen Email schon registriert')
        }
        else
        console.log("Fehler bei der Benutzerdaten Erstellung: " +e);
}}

  
  
  
  return(
    <div className = 'sign-up-container'>
    <h2>Habe kein Konto</h2>
   <span>Mit Email und Passwort registrieren</span>
   <form onSubmit = {handleSubmit}>


 
   <FormInput type = "text"  label = "Display Name" required   onChange = {handleChange} name = "displayName" value = {displayName}/>



   <FormInput type = "email" required   label = "Email"  onChange = {handleChange}  name = "email" value = {email}/>




   <FormInput type = "password" required  label = "Password" onChange = {handleChange}  name = "password" value = {password}/>



   <FormInput type = "password" required label = "Confirm Password"  onChange = {handleChange}  name = "confirmPassword" value = {confirmPassword}/>

   <Button  buttonType = 'google' type = "submit">Registrieren</Button>



   </form>
 </div>

  );

}
export default SignUpForm;