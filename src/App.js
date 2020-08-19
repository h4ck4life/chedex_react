import React from "react";

import Post from "./Post";

import {
  Container,
  Button,
  Navbar,
  Nav,
  Form,
  FormControl,
  ListGroup,
  Spinner,
  Pagination
} from "react-bootstrap";

import "./styles.css";

const listItems = function () {
  return Array(10)
    .fill()
    .map((_, i) => {
      return (
        <ListGroup.Item>
          <Post
            key={i}
            title="Title of the post"
            content="dsadsa dsdsadsa dsadsadsa dsdsadsadsaddsadsadsa dsadsadsadas dsadsadsadsa dasdsadsad dasdsadsa dsadsad dasdsadsa dsadsad"
            date="12 May 2018"
          />
        </ListGroup.Item>
      );
    });
};

const paginationBasic = function () {
  let active = 2;
  let items = [];
  for (let number = 1; number <= 5; number++) {
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
      <Pagination size="sm">{items}</Pagination>
    </div>
  );
};

const App = () => (
  <Container className="p-3">
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Chedex</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#about">About</Nav.Link>
          <Nav.Link
            target="_blank"
            href="https://github.com/h4ck4life/chedex_react"
          >
            Github
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Form inline>
        <FormControl
          size="lg"
          type="text"
          placeholder="Type here.."
          className="mr-sm-2"
        />
        <Button variant="primary" size="lg">
          Search
        </Button>
      </Form>
    </Navbar>
    <div className="d-flex justify-content-center">
      <Spinner variant="secondary" animation="grow" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
    <div>
      {paginationBasic()}
      <ListGroup>{listItems()}</ListGroup>
    </div>
  </Container>
);

export default App;
