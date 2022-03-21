import styled from 'styled-components';

//margin: 0 auto;

const Button = styled.button`
  display: block;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  color: #fff;
  background-color: #0e6b0e;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }

  :active {
    background-color: #060;
  }
`;

export default Button;
