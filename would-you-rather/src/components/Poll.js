import React, { Component } from "react";
import { connect } from "react-redux";
import { handleVoteOnQuestion } from "../actions/questions";
import { addAnswerToUser } from "../actions/users";
import { withRouter } from "react-router-dom";

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
    const { dispatch } = this.props;
    const option = this.state.selected;

    dispatch(
      handleVoteOnQuestion({
        authedUser: this.props.authedUser,
        qid: this.props.qid,
        answer: option,
        optionOneText: this.props.question.optionOne.text,
        optionTwoText: this.props.question.optionTwo.text,
      })
    );
    dispatch(addAnswerToUser(this.props.qid, option, this.props.authedUser));
  };

  render() {
    const { question, answered, choice, found} = this.props;
    const total= question.optionOne.votes.length+question.optionTwo.votes.length;
    console.log(total);
    if (answered === true && found === true) {
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
              <p> Number of votes {question.optionOne.votes.length}</p>
              <p>{(question.optionOne.votes.length/total).toFixed(2)*100}%</p>
              <br /> <p>{question.optionTwo.text} </p>{" "}
              <p> Number of votes {question.optionTwo.votes.length}</p>
              <p>{(question.optionTwo.votes.length/total).toFixed(2)*100}%</p>
            </div>
          ) : (
            <div>
              <p>{question.optionOne.text} </p> <br />{" "}
              <p> Number of votes {question.optionOne.votes.length}</p>
              <p>{(question.optionOne.votes.length/total).toFixed(2)*100}%</p>
              <p>
                {question.optionTwo.text}{" "}
                <span style={{ color: "red" }}> you voted</span>
                <p> Number of votes {question.optionTwo.votes.length}</p>
              <p>{(question.optionTwo.votes.length/total).toFixed(2)*100}%</p>
              </p>{" "}
            </div>
          )}
        </div>
      );
    } else if (found === true) {
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
    } else {
      return <h3>404 question not found</h3>;
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
    authedUser: authedUser,
    found: Object.keys(questions).includes(id) ? true : false,
    questions:questions,
  };
}

export default withRouter(connect(mapStateToProps)(Poll));
