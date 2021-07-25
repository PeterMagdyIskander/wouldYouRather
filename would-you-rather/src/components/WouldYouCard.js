import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class WouldYouCard extends Component {
  handleView=()=>{
    this.props.history.push(`/questions/${this.props.id}`)
  }
  render() {
    const {question,users}=this.props
    return (
      <div>
      <div>
      <img src={users[question.author].avatarURL} alt={`Avatar of ${question.author}`} />
        <h3>{question.author} asks: </h3>
      </div>
        <p>Would you rather </p>
        <p>...{question.optionOne.text}...</p>
        <button onClick={this.handleView}> View Poll </button>
      </div>
    )
  }
}

function mapStateToProps({ questions,users },{ id}) {
  const question = questions[id];

  return {
    question: question,
    users:users
  }
}
export default withRouter(connect(mapStateToProps)(WouldYouCard))
