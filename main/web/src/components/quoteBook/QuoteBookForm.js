import React, { useState } from 'react';
import styled from 'styled-components';

import Button from '../Button';

const Wrapper = styled.div`
  height: 100%;
`;

const Form = styled.form`
  height: 100%;
  display: block;
`;

const TextArea = styled.textarea`
  width: 70%;
  height: 50%;
`;

const TitleTextArea = styled.textarea`
  width: 70%;
  height: 5%;
`;

const QuoteBookForm = props => {
  // set the default state of the form
  //const [values, setValues] = useState({ title: props.title || '' });
  const [values, setValues] = useState();

  // update the state when a user types in the form
  const onChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Wrapper>
      <Form
        onSubmit={e => {
          e.preventDefault();
          props.action({
            variables: {
              ...values
            }
          });
        }}
      >
        <label htmlFor="title">Title:</label> <br />
        <TitleTextArea
          required
          type="text"
          name="title"
          placeholder="Quote Book title"
          //value={value.title}
          onChange={onChange}
        /> <br />
        <label htmlFor="comment">Comment:</label> <br />
        <TextArea
          required
          type="text"
          name="comment"
          placeholder="Quote Book comment"
          //value={value.comment}
          onChange={onChange}
        />
        <Button type="submit">Save</Button>
      </Form>
    </Wrapper>
  );
};

export default QuoteBookForm;
