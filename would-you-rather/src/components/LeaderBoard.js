import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "./Card";

class Leaderboard extends Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.usersID.map((ID) => (
            <li key={ID}>
              <Card id={ID} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    usersID: Object.keys(users).sort(
      (a, b) =>
        users[b].questions.length +
        Object.keys(users[b].answers).length -
        (users[a].questions.length + Object.keys(users[a].answers).length)
    ),
  };
}

export default connect(mapStateToProps)(Leaderboard);
