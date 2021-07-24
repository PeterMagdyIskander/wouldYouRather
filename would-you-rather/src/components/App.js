import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import LeaderBoard from "./LeaderBoard";
import NewQuestion from "./NewQuestion";
import SignInPage from "./SignInPage";
import Home from "./Home";
import Nav from "./Nav";
import LoadingBar from "react-redux-loading";
import Poll from "./Poll";
import PrivateRoute from './PrivateRoute'




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
            <PrivateRoute path="/"  isAuthenticated={this.props.authedUser}  exact component={Home}  />
            <PrivateRoute path="/leaderBoard" isAuthenticated={this.props.authedUser} component={LeaderBoard} />
            <PrivateRoute path="/new" isAuthenticated={this.props.authedUser} component={NewQuestion} />
            <PrivateRoute path="/polls/:id" isAuthenticated={this.props.authedUser} component={Poll}  />
            <Route path="/signIn" isAuthenticated={this.props.authedUser}  component={SignInPage} />
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser: authedUser,
  };
}

export default connect(mapStateToProps)(App);
