import React, { useEffect } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";

import AboutPage from "./pages/AboutPage";
import SearchPage from "./pages/SearchPage";

import "./styles.css";

const App = () => {
  useEffect(() => {
    // Run once, get the large index file into IndexDB + also check for index updates
  }, []);
  return (
    <Router>
      <Container className="p-3">
        <Navbar expand="lg">
          <Link title="Full-text search of chedet.cc blog" className="navbar-brand" to="/">
            <h3>Chedex</h3>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link className="nav-link" to="/about">
                About
              </Link>
              {/* <Nav.Link
                target="_blank"
                href="https://github.com/h4ck4life/chedex_react"
              > 
                Github
              </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path="/about">
            <AboutPage />
          </Route>
          <Route exact path="/">
            <SearchPage />
          </Route>
          <Route exact path="/search/:uriParam" render={(props) => <SearchPage uriParam={props.match.params.uriParam} />} />
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
