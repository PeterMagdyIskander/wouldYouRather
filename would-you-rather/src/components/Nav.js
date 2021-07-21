import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav () {
  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink to='/' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/new' activeClassName='active'>
            New Question
          </NavLink>
        </li>
        <li>
          <NavLink to='/leaderBoard' activeClassName='active'>
            leaderBoard
          </NavLink>
        </li>
        <li>
          <NavLink to='/signIn' activeClassName='active'>
            signIn
          </NavLink>
        </li>
      </ul>
    </nav>
  )
} 