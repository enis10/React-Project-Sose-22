import React from "react";
import './film-item.styles.scss'


const FilmCard = ({name, imageUrl})=> (
    <div className='collection-item'>
    <div
      className='image'
      style={{
        backgroundImage: `url(${imageUrl})`
      }}
    />
    <div className='collection-footer'>
      <span className='name'>{name}</span>
      
    </div>
  </div>


);

export default FilmCard;