import React from "react";
import Post from "./Post";
import {
  Container,
  Navbar,
  Nav,
  Form,
  FormControl,
  ListGroup,
  //Spinner,
  Pagination
} from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./styles.css";

const listItems = function () {
  return Array(10)
    .fill()
    .map((_, i) => {
      return (
        <ListGroup.Item key={i}>
          <Post
            title="Title of the post"
            content="Almost before we knew it, we had left the ground.Almost before we knew it, we had left the ground. Almost before we knew it, we had left the ground. Almost before we knew it, we had left the ground. Almost before we knew it, we had left the ground. Almost before we knew it, we had left the ground. Almost before we knew it, we had left the ground. Almost before we knew it, we had left the ground. Almost before we knew it, we had left the ground. Almost before we knew it, we had left the ground. Almost before we knew it, we had left the ground. Almost before we knew it, we had left the ground."
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
    <div className="w-100 d-inline-flex mt-4 mb-3">
      <div className="d-flex align-items-baseline">
        <Form
          inline
          onSubmit={(e) => {
            e.preventDefault();
            console.log("alif");
          }}
        >
          <FormControl
            size="md"
            type="text"
            placeholder="Search here.."
            className=""
            onChange={(e) => {
              if (e.target.value.length > 3 || e.target.value.trim() !== "") {
                console.log(e.target.value);
              }
            }}
          />
          {/* <Button className="btnSearch" variant="primary" size="lg">
          Search
        </Button> */}
        </Form>
      </div>
      <div className="w-100 d-flex flex-row-reverse">
        <Pagination className="d-flex align-items-baseline mb-0">
          {items}
        </Pagination>
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <Container className="p-3">
      <Navbar bg="light" expand="lg">
        <Link className="navbar-brand" to="/">
          <h3>Chedex</h3>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link className="nav-link" to="/about">
              About
            </Link>
            <Nav.Link
              target="_blank"
              href="https://github.com/h4ck4life/chedex_react"
            >
              Github
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {/* <div className="d-flex justify-content-center align-items-center mt-5">
      <Spinner variant="secondary" animation="grow" role="status" />
      <div className="ml-3">Loading index data..</div>
    </div> */}
      <Switch>
        <Route path="/about">
          <p>About</p>
        </Route>
        <Route path="/">
          <div>
            {paginationBasic()}
            <ListGroup>{listItems()}</ListGroup>
          </div>
        </Route>
      </Switch>
    </Container>
  </Router>
);

export default App;
