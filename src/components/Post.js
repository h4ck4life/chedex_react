import React from "react";

let createMarkup = function (content, keyword) {
  return { __html: content };
};

export default (props) => (
  <div className="pt-3 pb-3">
    <div className="mb-3">
      <div className="d-flex w-100">
        <div className="d-flex flex-fill">
          <b>{props.title}</b>
        </div>
        <div className="d-flex flex-fill flex-row-reverse">
          <a target="_blank" rel="noopener noreferrer" title={props.url} href={props.url}>View original post</a>
        </div>
      </div>
      <div>
        <span className="postDate">{props.date}</span>
      </div>
    </div>
    <div dangerouslySetInnerHTML={createMarkup(props.content, props.keyword)} />
  </div>
);
