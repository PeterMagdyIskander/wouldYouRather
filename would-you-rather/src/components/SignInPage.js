import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { Redirect } from "react-router-dom";

class SignInPage extends Component {
  state = {
    selectedUser: "none",
    redirectToReferrer: false,
  };

  handleOnChange = (e) => {
    this.setState(() => ({
      selectedUser: e.target.value,
    }));

    e.preventDefault();
  };
  handleOnClick = () => {
    const { dispatch } = this.props;
    dispatch(setAuthedUser(this.state.selectedUser));
    this.setState(() => ({ redirectToReferrer: true }));
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }
    return (
      <div>
        <h3>Welcome to the Would You Rather App!</h3>

        <h3> Sign in </h3>
        <select defaultValue="Accounts" onChange={this.handleOnChange}>
          <option value="Accounts" disabled>
            Accounts...
          </option>
          {this.props.usersID.map((ID) => (
            <option key={ID} value={ID}>
              {" "}
              {ID}
            </option>
          ))}
        </select>
        <button type="button" onClick={this.handleOnClick}>
          {" "}
          Sign in
        </button>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    usersID: Object.keys(users),
  };
}

export default connect(mapStateToProps)(SignInPage);
