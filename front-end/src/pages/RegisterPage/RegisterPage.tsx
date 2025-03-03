import RegisterForm from "../../forms/RegisterForm/RegisterForm"

const RegisterPage = () => {
  return (
    <div role="main" aria-label="Register Page" data-cy="register-page">
      <h1 className="display-1">Register</h1>
      <RegisterForm />
    </div>
  )
}

export default RegisterPage
