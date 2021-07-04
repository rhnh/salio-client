import React, { useReducer } from 'react'
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
  return (
    <form>
      <h3>{title}</h3>
      <p data-testid="custom-element">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Type your username here"
        />
      </p>
      <p data-testid="custom-element">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Type your password here"
        />
      </p>
      {isSignup && (
        <p data-testid="custom-element">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Re-type your password here"
          />
        </p>
      )}
      <button type="submit" disabled={state.isEmpty}>
        Submit
      </button>
    </form>
  )
}
