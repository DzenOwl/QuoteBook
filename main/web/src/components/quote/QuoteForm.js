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

const QuoteForm = props => {
  // set the default state of the form
  const [value, setValue] = useState({ content: props.content || '' });

  // update the state when a user types in the form
  const onChange = event => {
    setValue({
      ...value,
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
              ...value
            }
          });
        }}
      >
        <TextArea
          required
          type="text"
          name="content"
          placeholder="Quote content"
          value={value.content}
          onChange={onChange}
        />
        <Button type="submit">Save</Button>
      </Form>
    </Wrapper>
  );
};

export default QuoteForm;
