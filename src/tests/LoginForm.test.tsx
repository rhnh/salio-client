import { render, screen } from '@testing-library/react'

import LoginFrom from '../components/users/LoginForm'

describe('Render LoginForm', () => {
  const title = 'login'
  describe('renders Login', () => {
    const { container } = render(<LoginFrom title={title} />)
    it('renders a form with specific title', () => {
      const text = container.querySelector('h3')?.textContent
      expect(text).toEqual(title)
    })
    it('renders a p', () => {
      render(<LoginFrom title={title} />)
      const pTags = screen.getAllByTestId('custom-element')
      expect(pTags).toHaveLength(2)
    })
    it('renders username,password', () => {
      const { getByLabelText, getByText } = render(<LoginFrom title={title} />)
      const username = getByLabelText(/username/i)
      expect(username).toHaveAttribute('type', 'text')
      const password = getByLabelText(/password/i)
      expect(password).toHaveAttribute('type', 'password')
      const submitButton = getByText(/submit/i)
      expect(submitButton).toHaveAttribute('type', 'submit')
    })
  })

  describe('renders signup', () => {
    it('renders a p', () => {
      render(<LoginFrom title={title} isSignup={true} />)
      const pTags = screen.getAllByTestId('custom-element')
      expect(pTags).toHaveLength(3)
    })
    it('renders username,password, rePassword', () => {
      const { getByLabelText } = render(
        <LoginFrom title={title} isSignup={true} />
      )
      const password = getByLabelText(/re-type password/i)
      expect(password).toHaveAttribute('type', 'password')
    })
  })
})
