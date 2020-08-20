import React from "react";
import {
  FormControl,
  ListGroup,
  //Spinner,
  Pagination,
  Form
} from "react-bootstrap";

import Post from "../components/Post";

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
    <div className="w-100 d-inline-flex mt-4 mb-3">
      <div className="d-flex flex-fill align-items-baseline">
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
        {/* <Spinner
          variant="secondary"
          animation="border"
          size="sm"
          role="status"
        /> */}
      </div>
      <div className="d-flex flex-fill flex-row-reverse">
        <Pagination className="d-flex align-items-baseline mb-0">
          {items}
        </Pagination>
      </div>
    </div>
  );
};

export default (props) => (
  <div>
    {paginationBasic()}
    <ListGroup>{listItems()}</ListGroup>
  </div>
);
