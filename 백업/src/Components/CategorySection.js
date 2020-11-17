import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  :not(:last-child) {
    margin-bottom: 50px;
  }
`;
const Title = styled.span`
  font-size: 20px;
  font-weight: 600;
`;
const Grid = styled.div`
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 125px);
  grid-gap: 25px;
`;

const ViewMore = styled(Link)`
  padding: 3px 10px;
  border: 2.5px dashed darkred;
  margin-left: 15px;
  color: deepskyblue;
  font-size: 14px;
  &:hover {
    color: skyblue;
    font-size: 15px;
  }
`;

const CategorySection = ({ title, children, link }) => (
  <Container>
    <Title>{title.toUpperCase()} </Title>
    <ViewMore to={link}>View More...</ViewMore>
    <Grid>{children}</Grid>
  </Container>
);

CategorySection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default CategorySection;
