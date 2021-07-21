import React, { Component } from "react";
import { connect } from "react-redux";
import { handleVoteOnQuestion } from "../actions/questions";

class Poll extends Component {
  state = {
    selected: "none",
  };

  handleOnChange = (e) => {
    this.setState(() => ({
      selected: e.target.value,
    }));
  };
  handleOnSubmit = (e) => {
    e.preventDefault();
    const { dispatch,} = this.props;
    const { option } = this.state.selected;

    dispatch(
      handleVoteOnQuestion({ authedUser: this.props.authedUser, qid: this.props.qid, answer: option })
    );
    console.log("You have selected:", this.state.selected);
  };

  render() {
    const { question, answered, choice } = this.props;

    if (answered === true) {
      return (
        <div>
          <h3>{question.author} asks:</h3>
          <h2>Would you Rather ...</h2>
          {choice === "optionOne" ? (
            <div>
              <p>
                {question.optionOne.text}{" "}
                <span style={{ color: "red" }}> you voted</span>
              </p>{" "}
              <br /> <p>{question.optionTwo.text} </p>{" "}
            </div>
          ) : (
            <div>
              <p>{question.optionOne.text} </p> <br />{" "}
              <p>
                {question.optionTwo.text}{" "}
                <span style={{ color: "red" }}> you voted</span>
              </p>{" "}
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div>
          <h3>{question.author} asks:</h3>
          <h2>Would you Rather ...</h2>
          <form>
            <input
              type="radio"
              id={question.optionOne.text}
              name="choices"
              value="optionOne"
              onChange={this.handleOnChange}
            />

            <label htmlFor={question.optionOne.text}>
              {question.optionOne.text}
            </label>
            <br />
            <input
              type="radio"
              id={question.optionTwo.text}
              name="choices"
              value="optionTwo"
              onChange={this.handleOnChange}
            />

            <label htmlFor={question.optionTwo.text}>
              {question.optionTwo.text}
            </label>
            <br />
            <button type="submit" onClick={this.handleOnSubmit}>
              {" "}
              Submit{" "}
            </button>
          </form>
        </div>
      );
    }
  }
}

function mapStateToProps({ questions, users, authedUser }, props) {
  const { id } = props.match.params;
  const user = users[authedUser];
  const question = questions[id];
  const userAnsweredIds = Object.keys(user.answers);
  let choice = null;
  if (userAnsweredIds.includes(id)) {
    choice = user.answers[id];
  }

  return {
    question: question,
    answered: userAnsweredIds.includes(id) ? true : false,
    choice: choice,
    qid: id,
  };
}

export default connect(mapStateToProps)(Poll);
