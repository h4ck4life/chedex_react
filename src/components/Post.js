/**
 * Regex to find para - https://regex101.com/r/XtfS4Y/1
 */

import React, { useState, useEffect } from "react";
import {
  Badge,
} from "react-bootstrap";
import Sharect from "sharect";


let createMarkup = function (content, keyword) {
  return { __html: content };
};

export default (props) => {

  const [score, setScore] = useState(0);
  const [badgeColor, setBadgeColor] = useState(0);

  useEffect(() => {
    setScore(props.score);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if(score < 7 && score >= 5) {
      setBadgeColor('#e89907');
    }
    if(score < 5) {
      setBadgeColor('#ef8282');
    }
    if(score > 6) {
      setBadgeColor('#4ebf4e');
    }
  }, [score]); // eslint-disable-line react-hooks/exhaustive-deps

  Sharect.config({
    facebook: true,
    twitter: true,
    //twitterUsername: 'estevanmaito',
    backgroundColor: '#007bff',
    iconColor: '#FFF',
    selectableElements: ['.post'],
  }).init();

  const badgeStyle = {
    color: badgeColor,
  };  

  return (
    <div className="pt-3 pb-3">
      <div className="mb-3">
        <div className="d-flex align-items-baseline w-100">
          <div className="d-flex flex-fill align-items-baseline">
            <b>{props.title}</b>
          </div>
          <div className="d-flex flex-fill flex-row-reverse">
            <a target="_blank" className="originalPost" rel="noopener noreferrer" title={props.url} href={props.url}>View original post</a>
          </div>
        </div>
        <div>
          <Badge className="mr-1 score" title="Rationality scoring" variant="light" style={badgeStyle}>score {(props.score).toFixed(1) || 0}</Badge>
          <span className="postDate">{props.date.split(' | ')[0]}</span>
        </div>
      </div>
      <div className="post" dangerouslySetInnerHTML={createMarkup(props.content, props.keyword)} />
    </div>
  )
};