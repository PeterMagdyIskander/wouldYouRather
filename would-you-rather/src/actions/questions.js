import {_saveQuestion,_saveQuestionAnswer} from '../utils/_DATA'
import { showLoading,hideLoading } from 'react-redux-loading'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTIONS='ADD_QUESTIONS'
export const VOTE_ON_QUESTION='VOTE_ON_QUESTION'


export function receiveQuestions (questions) {
    return {
      type: RECEIVE_QUESTIONS,
      questions,
    }
  }

  function addQuestions(question){
    return{
      type:ADD_QUESTIONS,
      question,
    }
  }

  function vote({ authedUser, qid, answer }){
    return{
      type:VOTE_ON_QUESTION,
      authedUser,
      qid,
      answer,
    }
  }

  export function handleVoteOnQuestion(info){
    console.log(info)
    return(dispatch)=>{
      
      return _saveQuestionAnswer(info).catch((e)=>{
        console.warn("error in voting",e);
        alert("there was an error voting on question")
      }).then(()=>{
        dispatch(vote(info))
      })
    }
  }

  export function handleAddQuestion(optionOne,optionTwo){
    return (dispatch,getState)=>{
      const {authedUser}=getState()
      dispatch(showLoading())
      return _saveQuestion({
        optionOne,
        optionTwo,
        author:authedUser
      }).then((question)=>dispatch(addQuestions(question)))
      .then(()=>dispatch(hideLoading()))
    }
  }