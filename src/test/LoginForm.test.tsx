import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginFrom from '../components/users/LoginForm'
import { getLoginFormInputFields } from './utils'
import { axe } from 'jest-axe'
import 'jest-axe/extend-expect'
describe('LoginForm Display', () => {
  const title = 'login'
  describe('should render Login', () => {
    const { container } = render(<LoginFrom title={title} />)
    it('renders a form with specific title', () => {
      const text = container.querySelector('h3')?.textContent
      expect(text).toEqual(title)
    })
    it('should render a p', () => {
      render(<LoginFrom title={title} />)
      const pTags = screen.getAllByTestId('custom-element')
      expect(pTags).toHaveLength(2)
    })
    it('should render username,password', () => {
      render(<LoginFrom title={title} />)
      const username = screen.getByLabelText(/username/i)
      expect(username).toHaveAttribute('type', 'text')
      expect(username).toHaveAttribute('placeholder', 'Type your username here')

      const password = screen.getByLabelText(/password/i)
      expect(password).toHaveAttribute('type', 'password')
      expect(password).toHaveAttribute('placeholder', 'Type your password here')

      const submitButton = screen.getByText(/submit/i)
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
      const password = getByLabelText(/Confirm Password/i)
      expect(password).toHaveAttribute(
        'placeholder',
        'Re-type your password here'
      )

      expect(password).toHaveAttribute('type', 'password')
    })
  })
})

describe('loginForm Basic functionalities', () => {
  describe('disabled button', () => {
    test('empty', () => {
      const { username, password, confirmPassword } = getLoginFormInputFields()
      userEvent.type(username, 'John')
      userEvent.type(password, 'something')
      userEvent.type(confirmPassword, 'somethingElse')
      const button = screen.getByText(/submit/i)
      expect(button).toBeDisabled()
    })
    test('not empty and confirmPassword matched with password', () => {
      const { username, password, confirmPassword } = getLoginFormInputFields()
      userEvent.type(username, 'John')
      userEvent.type(password, 'something')
      userEvent.type(confirmPassword, 'something')
      const button = screen.getByText(/submit/i)
      expect(button).not.toBeDisabled()
    })
  })

  it('submit should be disable, if inputs are empty', () => {
    const { username, password, confirmPassword } = getLoginFormInputFields()
    password.value = ''
    username.value = ''
    confirmPassword.value = ''
    const button = screen.getByText(/submit/i)
    expect(button).toBeDisabled()
  })
})
describe('accessibility', () => {
  const title = 'login'
  test('accessibility', async () => {
    const { container } = render(<LoginFrom title={title} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
