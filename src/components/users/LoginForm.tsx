import React from 'react'
interface Types {
  title: string
  isSignup?: boolean
}
export default function LoginForm({ title, isSignup = false }: Types) {
  return (
    <form>
      <h3>{title}</h3>
      <p data-testid="custom-element">
        <label htmlFor="username">Username</label>
        <input id="username" type="text" />
      </p>
      <p data-testid="custom-element">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
      </p>
      {isSignup && (
        <p data-testid="custom-element">
          <label htmlFor="retype-password">Re-type Password</label>
          <input type="password" id="retype-password" />
        </p>
      )}
      <button type="submit">Submit</button>
    </form>
  )
}
