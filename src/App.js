import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import routes from "./routes.js";

function App() {
  return (
    <div id="app">
      <div className="App-body">
        <Router>
          <div class="navbar">
            <Link to="/"> Home</Link> |<Link to="/auctions"> Auctions</Link> |
            <Link to="/users"> Users</Link>
          </div>
          <div style={{ float: "left" }}>
            <Switch>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />
              ))}
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
