import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import LeaderBoard from "./LeaderBoard";
import NewQuestion from "./NewQuestion";
import SignInPage from "./SignInPage";
import Home from "./Home";
import Nav from "./Nav";
import LoadingBar from "react-redux-loading";
import Poll from "./Poll";

import PrivateRoute from "./PrivateRoute";


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Router>
        <LoadingBar />
        <Fragment>
          <Nav />

         <div>
            {this.props.authed === true ? null : (
              <div>
                <Route path="/" exact component={Home} />
                <Route path="/leaderBoard" exact component={LeaderBoard} />
                <Route path="/new" exact component={NewQuestion} />
                <Route path='/polls/:id' component={Poll} />
                
              </div>
            )}
            <Route path="/signIn" exact component={SignInPage} />
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authed: authedUser === null,
    isAuthenticated : authedUser !==null,
  };
}

export default connect(mapStateToProps)(App,PrivateRoute);
