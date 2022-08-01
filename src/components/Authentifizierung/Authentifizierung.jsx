import React from 'react'
import { signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect, auth } from '../utils/firebase.util';
import Button from '../button/button.component';
import LogInpForm from '../sign-in-form copy/sign-in-form.component';

import './authentication.styles.scss'

import SignUpForm from '../sign-up-form/sign-up-form.component';




const SignIn =() =>  {
  

  return (
      <div className='authentication-container'>

    <LogInpForm/>
    <SignUpForm/>



   
    </div>
  );
}

export default SignIn;