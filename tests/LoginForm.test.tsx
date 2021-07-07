import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginFrom from '../components/users/LoginForm'

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
      const { getByLabelText, getByText } = render(<LoginFrom title={title} />)
      const username = getByLabelText(/username/i)
      expect(username).toHaveAttribute('type', 'text')
      expect(username).toHaveAttribute('placeholder', 'Type your username here')

      const password = getByLabelText(/password/i)
      expect(password).toHaveAttribute('type', 'password')
      expect(password).toHaveAttribute('placeholder', 'Type your password here')

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
      const password = getByLabelText(/Confirm Password/i)
      expect(password).toHaveAttribute(
        'placeholder',
        'Re-type your password here'
      )

      expect(password).toHaveAttribute('type', 'password')
    })
  })
})

const getLoginFormInputFields = () => {
  const { getByPlaceholderText, getByText } = render(
    <LoginFrom title="signup" isSignup={true} />
  )

  const username: HTMLInputElement = getByPlaceholderText(
    /username/i
  ) as HTMLInputElement

  const password: HTMLInputElement = getByPlaceholderText(
    /type your password here/gi
  ) as HTMLInputElement

  const confirmPassword: HTMLInputElement = getByPlaceholderText(
    /re-type your password here/gi
  ) as HTMLInputElement

  return {
    username,
    password,
    confirmPassword,
    getByText,
  }
}

describe('loginForm Basic functionalities', () => {
  describe('disabled button', () => {
    test('empty', () => {
      const { username, password, confirmPassword, getByText } =
        getLoginFormInputFields()
      userEvent.type(username, 'something')
      userEvent.type(password, 'something')
      userEvent.type(confirmPassword, 'somethingdd')
      const button = getByText(/submit/i)
      expect(button).toBeDisabled()
    })
    test('not empty', () => {
      const { username, password, confirmPassword, getByText } =
        getLoginFormInputFields()
      userEvent.type(username, 'something')
      userEvent.type(password, 'something')
      userEvent.type(confirmPassword, 'something')
      const button = getByText(/submit/i)
      expect(button).not.toBeDisabled()
    })
  })

  it('submit should be disable, if inputs are empty', () => {
    const { username, password, confirmPassword, getByText } =
      getLoginFormInputFields()
    password.value = ''
    username.value = ''
    confirmPassword.value = ''
    const button = getByText(/submit/i)
    expect(button).toBeDisabled()
  })
})
