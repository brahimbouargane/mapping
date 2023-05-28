import { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import HomePage from "./pages/homepage";
import Signin from "./pages/Signin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  const [user, setLoginUser] = useState({});
  return (
    // <div className="App">
    //   <Router>
    //     <Switch>
    //       <Route exact path="/">
    //         {user && user._id ? <HomePage /> : <Login />}
    //         <HomePage />
    //       </Route>
    //       <Route path="/Login">
    //         <Login setLoginUser={setLoginUser} />
    //       </Route>
    //       <Route path="/Register">
    //         <Signin />
    //       </Route>
    //     </Switch>
    //   </Router>
    // </div>
  );
}
