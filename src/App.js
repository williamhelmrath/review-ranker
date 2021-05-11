import React from "react";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";
import Product from "./components/Product";
import Header from "./components/Header";
import UserProvider from "./UserProvider";

export default function App() {
  return (
    <Router>
      <UserProvider>
        <CssBaseline />
        <Header />
        <Switch>
          <Route exact path="/products/:asin" component={Product} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Main} />
        </Switch>
      </UserProvider>
    </Router>
  );
}
