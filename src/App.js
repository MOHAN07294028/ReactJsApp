import React from "react";
import LayoutMainFrame from "./Components/Layout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";

function App() {
  const isAuthorized =
    sessionStorage.getItem("is_AuthorizedToLogin") === "true";
  //  const getPagePath = sessionStorage.getItem("defaultLoginPage") ;

  console.log(isAuthorized,'isAuthorizedisAuthorized')
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/">
            {isAuthorized ? (
              <LayoutMainFrame />
            ) : (
              <Route path="/" component={Login} />
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
