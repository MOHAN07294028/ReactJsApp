import React from "react";
import LayoutMainFrame from "./Components/Layout";
import { BrowserRouter as Router, Route, Switch,Redirect } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import NotFound from "./Pages/NotFound";

function App() {
  const isAuthorized = sessionStorage.getItem("is_AuthorizedToLogin") === "true";
  const PagePath = sessionStorage.getItem("pagePath");
  return (
    <div className="App">
        <Router>
        <Switch>
          {(isAuthorized && PagePath != '/' ) && (
            <Route path="/" component={LayoutMainFrame} />
          )}
           <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/notfound" component={NotFound} />
          <Redirect to="/login" />
          {isAuthorized && <Redirect to="/login" />}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
