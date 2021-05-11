import React, { useState } from "react";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";
import ProductPage from "./components/Product";
import Header from "./components/Header";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <CssBaseline />
      <Header />
      <Switch>
        <Route path="/products/:asin">
          <ProductPage user={user} setUser={setUser} />
        </Route>
        <Route exact path="/login">
          <Login setUser={setUser} />
        </Route>
        <Route exact path="/" component={Main} />
      </Switch>
    </Router>
  );
}
