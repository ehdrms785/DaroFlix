import React from "react";
import styled from "styled-components";

const MyModalContainer = styled.div`
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;
`;
const Content = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 400px;
  overflow: auto;
  margin-left: -250px;
  margin-top: -200px;
  background: grey;
`;

class MyModal extends React.Component {
  render() {
    return (
      <MyModalContainer>
        <Content>
          <h2>This is modal 1</h2>

          {/* <button onClick={onClose}>닫기입니다</button> */}
        </Content>
      </MyModalContainer>
    );
  }
}

export default MyModal;
