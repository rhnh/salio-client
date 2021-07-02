import { BrowserRouter as Router } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import DisplayNavBar from '../components/DisplayNavBar'

describe('basic Look/function regardless of condition', () => {
  test('valid', () => {
    render(
      <Router>
        <DisplayNavBar isLogin={true} handleLogin={(d: boolean) => {}} />;
      </Router>
    )
    const home = screen.getByText(/^home/i)
    const about = screen.getByText(/^about/i)
    const contact = screen.getByText(/^contacts$/i)
    //home
    expect(home).toBeInTheDocument()
    expect(home).toHaveAttribute('href', '/')
    //about
    expect(about).toBeInTheDocument()
    expect(about).toHaveClass('nav-right')
    expect(about).toHaveAttribute('href', '/about')

    //contact
    expect(contact).toBeInTheDocument()
    expect(contact).toHaveAttribute('href', '/contacts')
  })
})

describe('condition , if logged out', () => {
  test('valid', () => {
    const setState = (s: boolean) => {}
    const { rerender } = render(
      <Router>
        <DisplayNavBar isLogin={true} handleLogin={setState} />;
      </Router>
    )
    const isLogout = screen.getByText(/^logout$/i)
    userEvent.click(isLogout)

    rerender(
      <Router>
        <DisplayNavBar isLogin={false} handleLogin={setState} />
      </Router>
    )
    expect(isLogout).not.toBeInTheDocument()
    expect(screen.queryByText(/^login$/i)).toBeInTheDocument()
    expect(screen.queryByText(/^signup$/i)).toBeInTheDocument()
  })
})
describe('condition , if logged in', () => {
  test('valid', () => {
    const setState = (s: boolean) => {}
    const { rerender } = render(
      <Router>
        <DisplayNavBar isLogin={false} handleLogin={setState} />;
      </Router>
    )
    const isLogin = screen.getByText(/^login$/i)
    userEvent.click(isLogin)
    rerender(
      <Router>
        <DisplayNavBar isLogin={true} handleLogin={setState} />
      </Router>
    )
    expect(isLogin).not.toBeInTheDocument()
    expect(screen.queryByText(/^logout$/i)).toBeInTheDocument()
    expect(screen.queryByText(/^signup$/i)).not.toBeInTheDocument()
  })
})
