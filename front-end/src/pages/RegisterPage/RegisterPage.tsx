import RegisterForm from "../../forms/RegisterForm/RegisterForm"

const RegisterPage = () => {
  const handleClick = () => {
    window.location.reload()
  }

  return (
    <div role="main" aria-label="Register Page" data-cy="register-page">
      <h1
        className="display-1"
        onClick={handleClick}
        style={{
          cursor: "pointer",
        }}
      >
        Register
      </h1>
      <RegisterForm />
    </div>
  )
}

export default RegisterPage
