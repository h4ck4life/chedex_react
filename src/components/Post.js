import React from "react";

String.prototype.replaceAll = function (strReplace, strWith) {
  // See http://stackoverflow.com/a/3561711/556609
  var esc = strReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  var reg = new RegExp(esc, 'ig');
  return this.replace(reg, strWith);
};

let createMarkup = function (content, keyword) {
  //return { __html: content.replace(/\n/g, "<br />") };
  return { __html: content };
  //let originalKeyword = keyword;
  //return { __html: content.replaceAll(keyword, `<span class="highlight">${originalKeyword}</span>`) };
};

export default (props) => (
  <div className="pt-3 pb-3">
    <div className="mb-3">
      <div className="d-flex w-100">
        <div className="d-flex flex-fill">
          <b>{props.title}</b>
        </div>
        <div className="d-flex flex-fill flex-row-reverse">
          <a target="_blank" title={props.url} href={props.url}>View original post</a>
        </div>
      </div>
      <div>
        <span className="postDate">{props.date}</span>
      </div>
    </div>
    <div dangerouslySetInnerHTML={createMarkup(props.content, props.keyword)} />
  </div>
);
