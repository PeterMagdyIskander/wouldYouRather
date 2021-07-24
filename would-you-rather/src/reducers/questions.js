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
          ...state,
          [action.question.id]:action.question
        }
        case VOTE_ON_QUESTION:
          let votes1=[]
          let votes2=[]
          if(action.answer==='optionOne'){
            votes1=state[action.qid].optionOne.votes.concat([action.authedUser])
            votes2=state[action.qid].optionTwo.votes
          }else{
            votes1=state[action.qid].optionOne.votes
            votes2=state[action.qid].optionTwo.votes.concat([action.authedUser])
          }
          return{
            ...state,
            [action.qid]:{
              ...state[action.qid],
              optionOne: Object.assign({},{votes:votes1},{text:state[action.qid].optionOne.text}),
              optionTwo: Object.assign({},{votes:votes2},{text:state[action.qid].optionTwo.text}) ,
            }
          }
      default :
        return state
    }
  }