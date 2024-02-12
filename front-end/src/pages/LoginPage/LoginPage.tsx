import React from "react"
import LoginForm from "../../forms/LoginForm/LoginForm"

interface LoggedOutRoutesProps {
  setLogin: any
}

const LoginPage: React.FC<LoggedOutRoutesProps> = ({ setLogin }) => {
  return (
    <div>
      <LoginForm setLogin={setLogin} />
    </div>
  )
}

export default LoginPage
