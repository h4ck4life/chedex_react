import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default (props) => (
  <Container className="mt-4 mb-3">
    <Row className="mb-4">
      <Col>
        <h5>What is Chedex</h5>
        <div>Chedex is a full-text search webapp of Tun Mahathir's official blog posts, <a href="http://chedet.cc/">chedet.cc</a>. You're able to search chedet blog posts by using single/mutiple keyword. The results is sorted by rationality ranking/scoring <a href="https://github.com/weixsong/elasticlunr.js">(read more)</a></div>
      </Col>
    </Row>
    <Row className="mb-4">
      <Col>
        <h5>Source code</h5>
        <p>You're welcome to contribute to make this webapp better,</p>
        <div>Scraper + Indexer → <a rel="noopener noreferrer" target="_blank" href="https://github.com/h4ck4life/chedex">https://github.com/h4ck4life/chedex</a></div>
        <div>Web App → <a rel="noopener noreferrer" target="_blank" href="https://github.com/h4ck4life/chedex_react">https://github.com/h4ck4life/chedex_react</a></div>
      </Col>
    </Row>
    <Row className="mb-4">
      <Col>
        <h5>Contact</h5>
        <div>Email → <a href="mailto:alifaziz@gmail.com">alifaziz@gmail.com</a></div>
        <div>Github → <a rel="noopener noreferrer" target="_blank" href="https://github.com/h4ck4life">h4ck4life</a></div>
        <div>Twitter → <a rel="noopener noreferrer" target="_blank" href="https://twitter.com/h4ck4life">@h4ck4life</a></div>
      </Col>
    </Row>
  </Container>
);
