import React, { Component } from "react";
import { connect } from "react-redux";

class Card extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <img src={user.avatarURL} alt={`Avatar of ${user.id}`} />
        <h3>{user.id} </h3>
        <p>Answered questions {Object.keys(user.answers).length} </p>
        <p>Created questions {user.questions.length} </p>
        <p>Score {user.questions.length + Object.keys(user.answers).length}</p>
      </div>
    );
  }
}

function mapStateToProps({ users }, { id }) {
  const user = users[id];

  return {
    user: user,
  };
}

export default connect(mapStateToProps)(Card);
