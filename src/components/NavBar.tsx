import React from 'react'
import DisplayNavBar from './DisplayNavBar'
export default function NavBar() {
  const [isLogged, setLogged] = React.useState<boolean>(false)
  const handleLogin = (state: boolean) => {
    console.log('state has been changed', state)
    setLogged(state)
  }
  return <DisplayNavBar isLogin={isLogged} handleLogin={handleLogin} />
}
