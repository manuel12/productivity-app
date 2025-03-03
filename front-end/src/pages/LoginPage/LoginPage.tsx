import React from "react"
import LoginForm from "../../forms/LoginForm/LoginForm"

interface LoggedOutRoutesProps {
  setLogin: (userLoggedIn: boolean) => void
}

const LoginPage: React.FC<LoggedOutRoutesProps> = ({ setLogin }) => {
  return (
    <div role="main" aria-label="Login Page" data-cy="login-page">
      <h1 className="display-1">Login</h1>
      <LoginForm setLogin={setLogin} />
    </div>
  )
}

export default LoginPage
