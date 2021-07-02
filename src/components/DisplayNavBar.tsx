import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function DisplayNavBar({
  isLogin,
  handleLogin,
}: {
  isLogin: boolean
  handleLogin: (setLogin: boolean) => void
}) {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about" className="nav-right">
          about
        </Link>
      </li>
      <li>
        <Link to="/contacts">contacts</Link>
      </li>
      {!isLogin ? (
        <>
          <li>
            <Link to="/signup" onClick={() => handleLogin(true)}>
              signup
            </Link>
          </li>
          <li>
            <Link to="/login" onClick={() => handleLogin(true)}>
              login
            </Link>
          </li>
        </>
      ) : (
        <li>
          <Link to="/logout" onClick={() => handleLogin(false)}>
            logout
          </Link>
        </li>
      )}
    </ul>
  )
}
