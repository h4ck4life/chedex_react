import React from "react";

let createMarkup = function (content) {
  return { __html: content };
};

export default (props) => (
  <div className="pt-3 pb-3">
    <div className="mb-3">
      <b>{props.title}</b>
      <div>
        <span className="postDate">{props.date}</span>
      </div>
    </div>
    <div dangerouslySetInnerHTML={createMarkup(props.content)} />
  </div>
);
