import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { Redirect } from "react-router-dom";

class SignInPage extends Component {
  state = {
    account: false,
    selectedUser:'none',
  };

  handleOnChange = (e) => {
    this.setState(()=>({
      selectedUser:e.target.value,
    }))

    e.preventDefault();
  };
  handleOnClick=()=> {
    const { dispatch } = this.props;
    dispatch(setAuthedUser(this.state.selectedUser));
    this.setState(() => ({ account: true }))
  }

  render() {
    if (this.state.account === true) {
      return <Redirect to="/" />;
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
