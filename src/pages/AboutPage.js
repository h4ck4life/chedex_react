import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default (props) => (
  <Container className="mt-4 mb-3">
    <Row className="mb-4">
      <Col>
        <h5>What is Chedex</h5>
        <div>Chedex is a full-text search webapp of Tun Mahathir's official blog posts, <a href="http://chedet.cc/">chedet.cc</a>. You're able to search chedet blog posts by using single/multiple keyword. Search results are sorted by rationality ranking/scoring <a href="https://lucene.apache.org/core/3_5_0/scoring.html">(read more)</a></div>
      </Col>
    </Row>
    <Row className="mb-4">
      <Col>
        <h5>API</h5>
        <p>Feel free to use in your own project,</p>
        <div><a rel="noopener noreferrer" target="_blank" href="https://chedex.herokuapp.com/search/vision 2020">https://chedex.herokuapp.com/search/vision 2020</a><div>
      </Col>
    </Row>
    <Row className="mb-4">
      <Col>
        <h5>Dev Contact</h5>
        <div>Email → <a href="mailto:alifaziz@gmail.com">alifaziz@gmail.com</a></div>
        {/*<div>Github → <a rel="noopener noreferrer" target="_blank" href="https://github.com/h4ck4life">h4ck4life</a></div>*/}
        <div>Twitter → <a rel="noopener noreferrer" target="_blank" href="https://twitter.com/h4ck4life">@h4ck4life</a></div>
      </Col>
    </Row>
  </Container>
);
