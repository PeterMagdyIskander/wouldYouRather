import {RECEIVE_QUESTIONS, ADD_QUESTIONS,VOTE_ON_QUESTION} from '../actions/questions'

export default function questions (state = {}, action) {
    switch(action.type) {
      case RECEIVE_QUESTIONS :
        return {
          ...state,
          ...action.questions
        }
      case ADD_QUESTIONS:
        return{
          //todo
        }
        case VOTE_ON_QUESTION:
        
          return{
            ...state,
            [action.qid]:{
              ...state[action.qid],
              optionOne: action.answer==='optionOne' ? state[action.qid].optionOne.votes.concat([action.authedUser]) : null ,
              optionTwo: action.answer==='optionTwo' ? state[action.qid].optionTwo.votes.concat([action.authedUser]) : null ,
            }
          }
      default :
        return state
    }
  }