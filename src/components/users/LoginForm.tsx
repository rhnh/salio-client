import React, { useEffect, useReducer, useState } from 'react'
import { UserAction, UserState } from '../../utils/types'
interface Types {
  title: string
  isSignup?: boolean
}
function reducer(state: UserState, actions: UserAction): UserState {
  if (actions.type === 'input') {
    return {
      ...state,
      [actions.name]: actions.value,
      isEmpty: false,
    }
  }
  return state
}
const initialActions: UserState = {
  username: '',
  password: '',
  isEmpty: true,
}
export default function LoginForm({ title, isSignup = false }: Types) {
  const [state, dispatch] = useReducer(reducer, initialActions)
  const [isValidInput, setIsValidInput] = useState(true)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    dispatch({
      type: 'input',
      name,
      value,
    })
  }

  useEffect(() => {
    if (isSignup) {
      if (
        state.username.length > 0 &&
        state.password.length > 0 &&
        state.confirmPassword &&
        state.confirmPassword === state.password
      ) {
        setIsValidInput(false)
      } else {
        setIsValidInput(true)
      }
    } else {
      if (state.username.length > 0 && state.password.length > 0) {
        setIsValidInput(false)
      }
      setIsValidInput(true)
    }
  }, [isSignup, state.confirmPassword, state.password, state.username])
  const handleSubmit = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  return (
    <form onSubmit={handleSubmit}>
      <h3>{title}</h3>
      <p data-testid="custom-element">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          name="username"
          placeholder="Type your username here"
          onChange={handleChange}
        />
      </p>
      <p data-testid="custom-element">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Type your password here"
          onChange={handleChange}
        />
      </p>
      {isSignup && (
        <p data-testid="custom-element">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            placeholder="Re-type your password here"
            onChange={handleChange}
          />
        </p>
      )}
      <button type="submit" disabled={isValidInput}>
        Submit
      </button>
    </form>
  )
}
