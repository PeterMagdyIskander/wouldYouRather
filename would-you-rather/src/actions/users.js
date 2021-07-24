export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_QUESTION_TO_USER = "ADD_QUESTION_TO_USER";
export const ADD_ANSWER_TO_USER='ADD_ANSWER_TO_USER'


export function addQuestionToUser(questionId, userId) {
  console.log(questionId, userId)
  return { 
    type: ADD_QUESTION_TO_USER, 
    questionId,
    userId
   };
}

export function addAnswerToUser(questionId, option,userId) {
  return { 
    type: ADD_ANSWER_TO_USER, 
    questionId,
    option,
    userId
   };
}

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}
