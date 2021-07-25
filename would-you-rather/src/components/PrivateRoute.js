import React from 'react'
import { Redirect,Route } from 'react-router';



const PrivateRoute = ({ component: Component,isAuthenticated,location, ...rest }) => (
  <Route {...rest} render={(props) => (
      isAuthenticated === null
      ? <Redirect to={{
          pathname: '/signIn',
          state: { from: location }
        }} />
      : <Component {...props} />
  )} />
)

export default PrivateRoute