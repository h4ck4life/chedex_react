import React, { useState, useEffect } from "react";
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

  // Search results state
  const [keyword, setKeyword] = useState();
  const [results, setResults] = useState([]);
  const [resultList, setResultList] = useState([]);
  const [count, setResultsCount] = useState(0);
  const [isLoading, setLoading] = useState(false);

  // Pagination state config
  const postPerPage = 10;
  const [isPageFirstDisable, setIsPageFirstDisable] = useState(true);
  const [isPagePrevDisable, setIsPagePrevDisable] = useState(true);
  const [isPageNextDisable, setIsPageNextDisable] = useState(true);
  const [isPageLastDisable, setIsPageLastDisable] = useState(true);
  const [pageCurrentIndex, setPageCurrentIndex] = useState(10);
  const [totalPageNumber, setTotalPageNumber] = useState(1);

  const setPagination = function (nav) {
    if (results && results.length > 0) {
      switch (nav) {
        case 'next':
          //console.log(`Next ${pageCurrentIndex} - ${pageCurrentIndex + postPerPage}`);
          let pageListNext = results.slice(pageCurrentIndex, pageCurrentIndex + postPerPage);
          setResultList(pageListNext);
          setIsPagePrevDisable(false);
          setIsPageFirstDisable(false);
          if (pageCurrentIndex === (Math.floor(results.length / postPerPage) * 10)) {
            setIsPageNextDisable(true);
            setIsPageLastDisable(true);
          } else {
            setPageCurrentIndex(pageCurrentIndex + postPerPage);
          }
          break;
        case 'prev':
          //console.log(`Prev ${pageCurrentIndex - postPerPage} - ${pageCurrentIndex}`);
          let pageListPrev = results.slice(pageCurrentIndex - postPerPage, pageCurrentIndex);
          //setPageCeilingIndex(pageCeilingIndex - postPerPage);
          setResultList(pageListPrev);
          setIsPageNextDisable(false);
          setIsPageLastDisable(false);
          if (pageCurrentIndex === postPerPage) {
            setIsPagePrevDisable(true);
            setIsPageFirstDisable(true);
          } else {
            setPageCurrentIndex(pageCurrentIndex - postPerPage);
          }
          break;
        case 'last':
          var start = (Math.floor(results.length / postPerPage) * 10);
          //console.log(`Last ${start} - ${start + postPerPage}`);
          let pageListLast = results.slice(start, start + postPerPage);
          //setPageCurrentIndex(pageCurrentIndex + postPerPage);
          setResultList(pageListLast);
          setIsPagePrevDisable(false);
          setIsPageNextDisable(true);
          setIsPageFirstDisable(false);
          setIsPageLastDisable(true);
          setPageCurrentIndex(start);
          break;
        case 'first':
          //console.log(`First ${0} - ${postPerPage}`);
          let pageListFirst = results.slice(0, postPerPage);
          setResultList(pageListFirst);
          setIsPagePrevDisable(true);
          setIsPageNextDisable(false);
          setIsPageFirstDisable(true);
          setIsPageLastDisable(false);
          setPageCurrentIndex(10);
          break;
        default:
          //console.log(`Default ${0} - ${postPerPage}`);
          let pageListDefault = results.slice(0, postPerPage);
          setResultList(pageListDefault);
          setIsPagePrevDisable(true);
          setIsPageNextDisable(false);
          setIsPageLastDisable(false);
          setIsPageFirstDisable(true);
          break;
      }

    } else {
      //console.log(results.length);
      setResultList([]);
    }
  }

  useEffect(() => {
    setPageCurrentIndex(10);
    setResultsCount(results.length || 0);
    setPagination();

    var totalPage = Math.floor(results.length / postPerPage);
    setTotalPageNumber(totalPage === 0 ? 1 : totalPage);

  }, [results]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="row d-flex mt-4 mb-3">
        <div className="col-md-8 d-flex align-items-baseline">
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
                  if (keyword !== undefined && keyword.length > 2 && keyword.trim() !== "") {
                    setLoading(true);
                    fetch(`https://chedex.herokuapp.com/search/${keyword}`)
                      .then(res => res.json())
                      .then(
                        (result) => {
                          setResults(result);
                          setLoading(false);
                        },
                        (error) => {
                          console.log(error.message);
                          setLoading(false);
                        }
                      )
                  } else {
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
        <div className="col-md-4 d-flex align-items-baseline flex-row-reverse">
          <Pagination className="d-flex align-items-baseline mb-0">
            <Pagination.First disabled={isPageFirstDisable} onClick={() => { setPagination('first') }} />
            <Pagination.Prev disabled={isPagePrevDisable} onClick={() => { setPagination('prev') }} />
            <Pagination.Next disabled={isPageNextDisable} onClick={() => { setPagination('next') }} />
            <Pagination.Last disabled={isPageLastDisable} onClick={() => { setPagination('last') }} />
          </Pagination>
          <div className="d-flex mr-2 pageInfo">
            Page {pageCurrentIndex / 10} of {totalPageNumber}
          </div>
        </div>
      </div>
      <ListGroup>
        <ListItems keyword={keyword} results={resultList} />
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
