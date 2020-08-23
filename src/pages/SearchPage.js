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
  const [isLoading, setLoading] = useState(false);

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
      <div className="row d-flex mt-4 mb-3">
        <div className="col-md-9 d-flex align-items-baseline">
          <div className="d-flex">
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
                setKeyword(e.target.value);
              }}
            />
            <Button
            className="ml-2 btnSearch"
            type="submit"
            disabled={isLoading}
            onClick={(e) => {
              if (keyword != undefined && keyword.length > 3 && keyword.trim() !== "") {
                setLoading(true);
                fetch(`https://chedex.herokuapp.com/search/${keyword}`)
                  .then(res => res.json())
                  .then(
                    (result) => {
                      setResults(result);
                      setResultsCount(result.length || 0);
                      setLoading(false);
                    },
                    (error) => {
                      console.log(error.message);
                      setLoading(false);
                    }
                  )
              } else{
                setResults([]);
                setResultsCount(0);
              }
            }} variant="primary">{isLoading ? 'Loading…' : 'Search'}</Button>
          </Form>
          </div>
          <div className="d-flex ml-2">
            <Badge variant="light"><span className="count">{count} post(s)</span></Badge>
          </div>
        </div>
        <div className="col-md-3 d-flex flex-row-reverse">
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
