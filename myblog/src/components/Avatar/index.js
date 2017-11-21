import React from 'react';
import './style.css';

export const Avatar = ({avatarNum = 1, width = 55}) => {

  return (
    <img src={require(`../../media/${avatarNum}.jpg`)} width={width} className='myAvatar'/>
  );
}
