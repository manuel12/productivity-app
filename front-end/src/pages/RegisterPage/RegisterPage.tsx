import React from "react"
import RegisterForm from "../../forms/RegisterForm/RegisterForm"

const RegisterPage = () => {
  return (
    <div role="main" aria-label="Register Page">
      <h1 className="display-1" data-cy="login-page">
        Register
      </h1>
      <RegisterForm />
    </div>
  )
}

export default RegisterPage
