import React from "react";
import {
  Badge,
} from "react-bootstrap";

let createMarkup = function (content, keyword) {
  return { __html: content };
};

export default (props) => (
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
        <Badge className="mr-1 score" title="Rationality scoring" variant="light">score {(props.score).toFixed(1) || 0}</Badge>
        <span className="postDate">{props.date.split(' | ')[0]}</span>
      </div>
    </div>
    <div className="post" dangerouslySetInnerHTML={createMarkup(props.content, props.keyword)} />
  </div>
);
