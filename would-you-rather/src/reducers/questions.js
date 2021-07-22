import {RECEIVE_QUESTIONS, ADD_QUESTIONS,VOTE_ON_QUESTION} from '../actions/questions'

export default function questions (state = {}, action) {
    switch(action.type) {
      case RECEIVE_QUESTIONS :
        return {
          ...state,
          ...action.questions
        }
      case ADD_QUESTIONS:
        //const {question}=action
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
              optionOne: Object.assign({},[action.qid].optionOne,{votes:votes1}),
              optionTwo: Object.assign({},[action.qid].optionTwo,{votes:votes2}) ,
            }
          }
      default :
        return state
    }
  }