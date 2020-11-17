import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  font-size: 80px;
  margin-top: 80px;
`;

const Loading = () => (
  <Container>
    <Helmet>
      <title>Loading</title>
    </Helmet>
    <span role="img" aria-label="Loading">
      🕐
    </span>
  </Container>
);

export default Loading;
