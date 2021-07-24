import React from 'react'
import { Redirect,Route } from 'react-router';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component,isAuthenticated, ...rest }) => (
    <Route {...rest} render={(props) => (
      isAuthenticated === null
        ? <Redirect to='/signIn'/>
        : <Component {...props} />
    )} />
  )

function mapStateToProps({authedUser}){
    return{
        isAuthenticated : authedUser !==null,
    }
}
export default connect(mapStateToProps)(PrivateRoute)