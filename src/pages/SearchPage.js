import React, { useState } from "react";
import {
  FormControl,
  ListGroup,
  //Spinner,
  Pagination,
  Form
} from "react-bootstrap";
import Elasticlunr from "elasticlunr";

import Post from "../components/Post";

const getSearchIndex = function name() {
  let searchResults = [
    {
      id: 1,
      title: "ikan",
      content: "ikan bilis, ikan goreng",
      date: "12 August 2016"
    },
    {
      id: 2,
      title: "daging",
      content: "kambing, lembu",
      date: "7 Jan 2011"
    },
    {
      id: 3,
      title: "ayam",
      content: "kampung, kfc, mcd, kentang goreng",
      date: "15 July 2018"
    },
    {
      id: 4,
      title: "kentang",
      content: "frend fries, kentang goreng",
      date: "3 March 2020"
    }
  ];

  var index = Elasticlunr(function () {
    this.addField("title");
    this.addField("content");
    this.addField("date");
    this.setRef("id");
    this.saveDocument(true);
  });

  searchResults.forEach((val, idx) => {
    index.addDoc(val);
  });

  return index;
};

const ListItems = function (props) {
  return getSearchIndex()
    .search(props.keyword, {
      fields: {
        title: { boost: 1 },
        content: { boost: 2 }
      },
      bool: "AND"
    })
    .map((_, i) => {
      let item = getSearchIndex().documentStore.getDoc(_.ref);
      return (
        <ListGroup.Item key={i}>
          <Post title={item.title} content={item.content} date={item.date} />
        </ListGroup.Item>
      );
    });
};

const SearchView = function (props) {
  const [keyword, setKeyword] = useState();

  let active = 2;
  let items = [];
  for (let number = 1; number <= 3; number++) {
    items.push(
      <Pagination.Item
        onClick={() => console.log("alif")}
        key={number}
        active={number === active}
      >
        {number}
      </Pagination.Item>
    );
  }
  return (
    <div>
      <div className="w-100 d-inline-flex mt-4 mb-3">
        <div className="d-flex flex-fill align-items-baseline">
          <Form
            inline
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <FormControl
              value={keyword || ""}
              size="md"
              type="text"
              placeholder="Search here.."
              className=""
              onChange={(e) => {
                setKeyword(e.target.value);
                if (e.target.value.length > 3 && e.target.value.trim() !== "") {
                  // do the search here
                  console.log(e.target.value);
                }
              }}
            />
          </Form>
        </div>
        <div className="d-flex flex-fill flex-row-reverse">
          <Pagination className="d-flex align-items-baseline mb-0">
            {items}
          </Pagination>
        </div>
      </div>
      <ListGroup>
        <ListItems keyword={keyword} />
      </ListGroup>
    </div>
  );
};

export default () => {
  return (
    <div>
      <SearchView />
    </div>
  );
};
