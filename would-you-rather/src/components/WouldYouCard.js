import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class WouldYouCard extends Component {
  handleView=()=>{
    this.props.history.push(`/polls/${this.props.id}`)
  }
  render() {
    const {question}=this.props
    return (
      <div>
        <h3>{question.author} asks: </h3>
        <p>Would you rather </p>
        <p>...{question.optionOne.text}...</p>
        <button onClick={this.handleView}> View Poll </button>
      </div>
    )
  }
}

function mapStateToProps({ questions },{ id}) {
  const question = questions[id];

  return {
    question: question
  }
}
export default withRouter(connect(mapStateToProps)(WouldYouCard))
