import React from "react"
import LoginForm from "../../forms/LoginForm/LoginForm"

interface LoggedOutRoutesProps {
  setLogin: any
}

const LoginPage: React.FC<LoggedOutRoutesProps> = ({ setLogin }) => {
  return (
    <div role="main" aria-label="Login Page">
      <h1 className="display-1" data-cy="login-page">
        Login
      </h1>
      <LoginForm setLogin={setLogin} />
    </div>
  )
}

export default LoginPage
