import React from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Home from "Routes/Home";
import Search from "Routes/Search";
import TV from "Routes/TV";
import Header from "Components/Header";
import Detail from "Routes/Detail";
import ViewMore from "Routes/ViewMore";
export default () => (
  <Router>
    <Header />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/tv" exact component={TV} />
      <Route path="/search" exact component={Search} />
      <Route path="/movie/:id" exact component={Detail} />
      <Route path="/show/:id" exact component={Detail} />
      <Route path="/:type/viewMore/:subject" exact component={ViewMore} />
      <Route path="/:type/viewMore/:subject/:query" component={ViewMore} />
      {/* <Route path="/test/modal" component={} /> */}
      {/* <Redirect from="*" to="/" /> */}
    </Switch>
  </Router>
);
