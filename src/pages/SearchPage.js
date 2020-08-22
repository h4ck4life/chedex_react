import React, { useState } from "react";
import {
  FormControl,
  ListGroup,
  //Spinner,
  Badge,
  Pagination,
  Form,
  Button
} from "react-bootstrap";

import Post from "../components/Post";

const ListItems = function (props) {
  return props.results.map((item, i) => {
    return (
      <ListGroup.Item key={item.ref}>
        <Post keyword={props.keyword} title={item.doc.title} content={item.doc.content} date={item.doc.date} url={item.doc.url} />
      </ListGroup.Item>
    );
  });
};

const SearchView = function (props) {
  const [keyword, setKeyword] = useState();
  const [results, setResults] = useState([]);
  const [count, setResultsCount] = useState(0);

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
              placeholder="Type here.."
              className=""
              onChange={(e) => {
                //console.log(e.target.value);
                setKeyword(e.target.value);
              }}
            />
            <Button className="ml-2 btnSearch" type="submit" onClick={(e) => {
              if (keyword.length > 3 && keyword.trim() !== "") {
                fetch(`https://chedex.herokuapp.com/search/${keyword}`)
                  .then(res => res.json())
                  .then(
                    (result) => {
                      //console.log(result);
                      setResults(result);
                      setResultsCount(result.length || 0);
                    },
                    (error) => {
                      console.log(error.message);
                    }
                  )
              } else{
                setResults([]);
              }
            }} variant="primary">Search</Button>
          </Form>
          <div className="ml-2">
            <Badge variant="light"><span className="count">{count} post(s) found</span></Badge>
          </div>
        </div>
        <div className="d-flex flex-fill flex-row-reverse">
          <Pagination className="d-flex align-items-baseline mb-0">
            {items}
          </Pagination>
        </div>
      </div>
      <ListGroup>
        <ListItems keyword={keyword} results={results} />
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
