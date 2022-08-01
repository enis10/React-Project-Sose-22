import React from "react";
import './form-input.styless.scss'

const FormInput = ({label,...otherProps }) =>{
    return(

        <div className="group">  <input  className="form-input" type = "text"
        {...otherProps} />   
{   label &&( /* Wenn label existiert dann das Folgendes anzeign Render*/

        <label className= {`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label> /* Wenn der die PROPS Eexistiert dann shrink */

)}
       
        </div>
         )



}


export default FormInput;