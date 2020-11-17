import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  background-color: rgba(20, 20, 20, 0.9);
  box-shadow: 0px 1px 2px 1px rgba(222, 37, 16, 0.6);

  z-index: 10;
`;
const List = styled.ul`
  display: flex;
`;
const Item = styled.li`
  width: 80px;
  text-align: center;
  height: 50px;
`;
const SLink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 3px solid
    ${(props) =>
      Boolean(props.current) ? "rgba(255, 255, 255, 0.9)" : "transparent"};
  transition: border-bottom 0.2s ease-in-out;
`;
export default withRouter(({ location: { pathname } }) => (
  <Header>
    <List>
      <Item>
        <SLink to="/" current={pathname === "/" ? 1 : 0}>
          Movies
        </SLink>
      </Item>
      <Item>
        <SLink to="/tv" current={pathname === "/tv" ? 1 : 0}>
          TV
        </SLink>
      </Item>
      <Item>
        <SLink to="/search" current={pathname === "/search" ? 1 : 0}>
          Search
        </SLink>
      </Item>
    </List>
  </Header>
));
