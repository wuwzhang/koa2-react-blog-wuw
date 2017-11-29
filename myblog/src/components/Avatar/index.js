import React from 'react';
import './style.css';

export const Avatar = ({avatarNum = '1', width = 55}) => {

  var avatarNumArr = ['1', '2', '3', '4', '5', '6'],
      type = 2;

  for (let i = 0, len = avatarNumArr.length; i < len; i++) {
    if (avatarNum === avatarNumArr[i]) {
      type = 1;
    }
  }

  if (type === 1) {
    return (
      <img src={require(`../../media/${avatarNum}.jpg`)} width={width} className='myAvatar'/>
    );
  }

  return (
    <img src={ avatarNum } width={width} className='myAvatar'/>
  )
}
