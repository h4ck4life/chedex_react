import React, { useState } from "react";

import Post from "./Post";

import {
  Container,
  Button,
  Navbar,
  Nav,
  Form,
  FormControl,
  ListGroup,
  Spinner
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

const App = () => (
  <Container className="p-3">
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Chedex</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#about">About</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Form inline>
        <FormControl
          size="lg"
          type="text"
          placeholder="Type here.."
          className="mr-sm-2"
        />
        <Button variant="success" size="lg">
          Search
        </Button>
      </Form>
    </Navbar>
    <div className="d-flex justify-content-center">
      <Spinner variant="secondary" animation="grow" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
    <ListGroup>{listItems()}</ListGroup>
  </Container>
);

export default App;
