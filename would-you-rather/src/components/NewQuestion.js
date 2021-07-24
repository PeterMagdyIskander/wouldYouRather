import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'


class NewQuestion extends Component {
    state = {
        text1: '',
        text2:'',
      }
      handleChange1 = (e) => {
        const text1 = e.target.value
    
        this.setState(() => ({
          text1
        }))
      }
      handleChange2 = (e) => {
        const text2 = e.target.value
    
        this.setState(() => ({
          text2
        }))
      }

      handleSubmit = (e) => {
        e.preventDefault()
    
        const { text1,text2 } = this.state
        console.log(text1,text2)
        const {dispatch}=this.props
        dispatch(handleAddQuestion(text1,text2))
        //this.props.history.push(`/polls/${this.props.users[this.props.authedUser].questions[this.props.users[this.props.authedUser].questions.length]}`)

        this.setState(() => ({
          text1: '',
          text2: '',
          
        }))
      }

    render() {
        const { text1,text2 } = this.state
      return (
        <div>
            <h3>Create new Question</h3>
            
            <h5>Complete the question: </h5>

            <h4> Would you rather ... </h4>
            <form  onSubmit={this.handleSubmit}>
            <textarea placeholder='Ente Option One Text Here'
            value={text1}
            onChange={this.handleChange1
            }
            > </textarea>
            <p> ------------------- OR ----------------</p>
            <textarea placeholder='Ente Option Two Text Here'
            value={text2}
            onChange={this.handleChange2}
            > </textarea>
            <button type='submit' disabled={text1 === ''|| text2===''} >Submit</button>


            </form>

        </div>
      )
    }
  }
function mapStateToProps({authedUser,users}){
  return{
    authedUser:authedUser,
    users:users
  }
}
export default connect(mapStateToProps)(NewQuestion)