import React from "react";
import Router from "Components/Router";
import GlobalStyles from "Components/GlobalStyles";
import ModalPortal from "./ModalPortal";
import MyModal from "./MyModal";
class App extends React.Component {
  render() {
    return (
      <>
        <Router />
        <GlobalStyles />
      </>
    );
  }
}

export default App;
