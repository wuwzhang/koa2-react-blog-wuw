import React from 'react';

import FontAwesome from 'react-fontawesome';
import './style.css';

export const ArticleTime = ({ create_time, update_time, color='#369' }) => {
  return(
    <section className="ArticleTime">
      <h6 className="ArticleTime-TimeTitle" style={{ color: color }}><FontAwesome className="ArticleTime-TimeTitle-icon" name='clock-o' /><span sstyle={{ color: color }}>Time</span></h6>
      <ul>
        <li><span className="ArticleTime-time">create </span><span>{ create_time }</span></li>
        <li><span className="ArticleTime-time">update </span><span>{ update_time }</span></li>
        <li></li>
      </ul>
    </section>
  );
}