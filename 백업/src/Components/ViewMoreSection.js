import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  :not(:last-child) {
    margin-bottom: 50px;
  }
`;
const Title = styled.span`
  font-size: 14px;
  font-weight: 600;
`;
const Grid = styled.div`
  justify-content: space-between;
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-gap: 20px;
`;

const ViewMoreSection = ({ title, children }) => (
  <Container>
    <Title>{title.toUpperCase()}</Title>
    <Grid>{children}</Grid>
  </Container>
);

ViewMoreSection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default ViewMoreSection;
