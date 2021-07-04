import React from 'react'
import DisplayNavBar from './DisplayNavBar'
export default function NavBar() {
  //@TODO isLogged has to come from global context
  const [isLogged, setLogged] = React.useState<boolean>(false)
  const handleLogin = (state: boolean) => {
    setLogged(state)
  }
  return <DisplayNavBar isLogin={isLogged} handleLogin={handleLogin} />
}
