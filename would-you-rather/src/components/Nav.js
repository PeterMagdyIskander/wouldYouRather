import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
class Nav extends Component {
  handleLogout=()=> {
    const { dispatch } = this.props;
    dispatch(setAuthedUser(null));
  }
  render() {
    if (this.props.authedUser !== null) {
      return (
        <div>
          <nav className="nav">
            <ul>
              <li>
                <NavLink to="/" exact activeClassName="active">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/add" activeClassName="active">
                  New Question
                </NavLink>
              </li>
              <li>
                <NavLink to="/leaderBoard" activeClassName="active">
                  leaderBoard
                </NavLink>
              </li>
              <li>
                <NavLink to="/signIn" activeClassName="active">
                  signIn
                </NavLink>
              </li>
            </ul>
          </nav>
          <h3>SIGNED IN AS : <span style={{ color: "red" }}> {this.props.authedUser}</span></h3>
          <button type='submit' onClick={this.handleLogout}> logout </button>
        </div>
      );
    }

    return (
      <nav className="nav">
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/add" activeClassName="active">
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to="/leaderBoard" activeClassName="active">
              leaderBoard
            </NavLink>
          </li>
          <li>
            <NavLink to="/signIn" activeClassName="active">
              signIn
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser: authedUser,
  };
}

export default connect(mapStateToProps)(Nav);
