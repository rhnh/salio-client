import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginFrom from '../components/users/LoginForm'

describe('LoginForm Display', () => {
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

describe('loginForm Basic functionalities', () => {
  // describe('should change input values,if type', () => {
  //   test.todo('invalid', () => {
  //     const { getByLabelText, getByText } = render(
  //       <LoginFrom title="signup" isSignup={true} />
  //     )
  //     const username: HTMLInputElement = getByLabelText(
  //       /username/i
  //     ) as HTMLInputElement
  //     userEvent.type(username, '')
  //     const button = getByText(/submit/i)
  //     expect(button).toBeDisabled()
  //   })
  // })

  it('submit should be disable, if inputs are empty', () => {
    const { getByPlaceholderText, getByText } = render(
      <LoginFrom title="signup" isSignup={true} />
    )
    const button = getByText(/submit/i)

    const username: HTMLInputElement = getByPlaceholderText(
      /username/i
    ) as HTMLInputElement

    const password: HTMLInputElement = getByPlaceholderText(
      /type your password here/gi
    ) as HTMLInputElement

    const confirmPassword: HTMLInputElement = getByPlaceholderText(
      /re-type your password here/gi
    ) as HTMLInputElement

    password.value = ''
    username.value = ''
    confirmPassword.value = ''

    expect(button).toBeDisabled()
  })
})
