import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/Login";
import Main from "./components/Main";
import ProductPage from "./components/Product";

export default function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/products/:asin">
            <ProductPage user={user} />
          </Route>
          <Route path="/login">
            <Login setUser={setUser} />
          </Route>

          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
