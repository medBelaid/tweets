import React, { Children } from "react";
import styled from "styled-components";

const LI = styled.li`
  border: 1px solid;
  padding: 10px;
  min-height: 50px;
`;

const Tweet = ({ children }) => {
  return <LI>{children}</LI>;
};

export default Tweet;
