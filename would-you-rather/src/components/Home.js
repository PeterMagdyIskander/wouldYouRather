import React, { Component } from "react";
import { connect } from "react-redux";
import WouldYouCard from "./WouldYouCard";

class Home extends Component {
  state = {
    answered: "isNotAnswered",
  };
  handleChangeNotAnswered = () => {
    this.setState(() => ({ answered: "isNotAnswered" }));
  };
  handleChangeAnswered = () => {
    this.setState(() => ({ answered: "isAnswered" }));
  };

  render() {
    if (this.state.answered === "none") {
      return (
        <div>
          <button onClick={this.handleChangeNotAnswered}>Unanswered </button>
          <button onClick={this.handleChangeAnswered}>answered</button>
        </div>
      );
    } else if (this.state.answered === "isAnswered") {
      return (
        <div>
          <button onClick={this.handleChangeNotAnswered}>Unanswered </button>
          <button onClick={this.handleChangeAnswered}>answered</button>
          <ul>
            {this.props.userAnsweredIds.map((ID) => (
              <li key={ID}>
                <WouldYouCard id={ID} />
              </li>
            ))}
          </ul>
        </div>
      );
    } else if (this.state.answered === "isNotAnswered") {
      return (
        <div>
          <button onClick={this.handleChangeNotAnswered}>Unanswered </button>
          <button onClick={this.handleChangeAnswered}>answered</button>
          <ul>
            {this.props.questionIds.map((ID) => (
              <li key={ID}>
                <WouldYouCard id={ID} />
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return null;
  }
}

function mapStateToProps({ questions, users, authedUser }) {
  const user = users[authedUser];
  const questionIds = Object.keys(questions);
  const userAnsweredIds = Object.keys(user.answers);
  const UnansweredQuestion = [];
  for (let i = 0; i < questionIds.length; i++) {
    if (!userAnsweredIds.includes(questionIds[i])) {
      UnansweredQuestion.push(questionIds[i]);
    }
  }

  return {
    questionIds: UnansweredQuestion.sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    userAnsweredIds: Object.keys(user.answers).sort((a,b) => questions[b].timestamp - questions[a].timestamp),
  };
}

export default connect(mapStateToProps)(Home);
