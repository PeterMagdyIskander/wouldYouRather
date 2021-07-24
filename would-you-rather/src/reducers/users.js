import { RECEIVE_USERS,ADD_QUESTION_TO_USER,ADD_ANSWER_TO_USER } from '../actions/users'

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }

    case ADD_QUESTION_TO_USER:
      return{
        ...state,
        [action.userId]:{
          ...state[action.userId],
          questions:state[action.userId].questions.concat([action.questionId])
        }
      }
    case ADD_ANSWER_TO_USER :
      return{
        ...state,
        [action.userId]:{
          ...state[action.userId],
          answers: {
            ...state[action.userId].answers,
            [action.questionId]:action.option
          }
        }
      }
    default :
      return state
  }
}