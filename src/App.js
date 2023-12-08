import React from "react";
import LayoutMainFrame from "./Components/Layout";
import { BrowserRouter as Router, Route, Switch,Redirect } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import NotFound from "./Pages/NotFound";
// import Dashboard from "./Components/Dashboard";

function App() {
  const isAuthorized = "true";
  // sessionStorage.getItem("is_AuthorizedToLogin") === "true";
  //  const getPagePath = sessionStorage.getItem("defaultLoginPage") ;
  return (
    <div className="App">
        <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/notfound" component={NotFound} />

          {/* If not authorized, redirect to login */}
          {isAuthorized == 'false' && <Redirect to="/login" />}

          {/* If authorized, load the layout */}
          {isAuthorized == 'true' && (
            <Route path="/" component={LayoutMainFrame} />
          )}

          {/* For all other routes not specified above, redirect to not found */}
          <Redirect to="/notfound" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
