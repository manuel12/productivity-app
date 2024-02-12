import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import LabeledInput from "../../components/LabeledInput/LabeledInput"
import FormAlert from "../../components/FormAlert/FormAlert"

import API from "../../api"

import { getItem, setItem, setUserLoggedInKey } from "../../utils"

interface LoginFormProps {
  setLogin: (login: boolean) => any
}

const LoginForm: React.FC<LoginFormProps> = ({ setLogin }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  })

  const [rememberMe, setRememberMe] = useState(getItem("rememberMe"))
  const [userLoginSuccessfull, setUserLoginSuccessfull] = useState(false)
  const [invalidCredentialsError, setInvalidCredentialsError] = useState(false)

  useEffect(() => {
    if (rememberMe) {
      const emailToRemember = getItem("rememberMeEmail") || null
      if (emailToRemember) {
        setValue("email", emailToRemember)
      }
    } else {
      setItem("rememberMeEmail", null)
    }
  })

  const validSubmit = (data: any) => {
    const email = data.email
    const password = data.password
    const userCredentials = { email, password }

    API.login(
      userCredentials,
      (res: any) => {
        return setInvalidCredentialsError(true)
      },
      (res: any) => {
        // Save token in localStorage
        const token = res.token
        setItem("token", token)

        const currentUser = res.data.filter((user: any) => {
          return user.email === email
        })[0]
        const currentUserUsername = currentUser.username

        if (rememberMe) {
          setItem("rememberMe", true)
          setItem("rememberMeEmail", email)
          setUserLoggedInKey()
        } else {
          setItem("rememberMe", false)
        }

        setItem("currentUser", currentUserUsername)
        setUserLoginSuccessfull(true)
        setTimeout(() => setLogin(true), 500)
      }
    )
  }

  const invalidSubmit = (data: any) => {
    setInvalidCredentialsError(true)
  }

  const handleRememberMeClick = () => {
    setRememberMe((prevState: any) => !prevState)
  }

  return (
    <>
      <FormAlert
        displayAlert={userLoginSuccessfull || invalidCredentialsError}
        msgs={["Login successfull!", "Email or password invalid."]}
        success={userLoginSuccessfull}
      />

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body" data-cy="login-form">
              <div
                className="alert text-center"
                style={{
                  backgroundColor: "#ccf3e9",
                  color: "#00654c",
                  borderColor: "#b8eee0",
                }}
              >
                {"You need to login to continue."}
              </div>
              <form onSubmit={handleSubmit(validSubmit, invalidSubmit)}>
                <div className="form-group">
                  <LabeledInput
                    autoFocus={true}
                    placeholder={"Email"}
                    registerLabel="email"
                    register={register}
                    // className="text-dark"
                    required
                    errors={errors}
                    errorLabel={"An email address is required."}
                    dataCy="user-email"
                  />
                </div>

                <div className="form-group">
                  <LabeledInput
                    type="password"
                    placeholder={"Password"}
                    registerLabel="password"
                    register={register}
                    required
                    errors={errors}
                    errorLabel={"A password is required."}
                    dataCy="user-password"
                  />
                </div>

                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    id="user_remember_me"
                    className="form-check-input"
                    data-cy="remember-me-button"
                    defaultChecked={rememberMe}
                    onClick={handleRememberMeClick}
                  />
                  <label
                    className="form-check-label float-start"
                    data-cy="remember-me"
                    htmlFor="user_remember_me"
                  >
                    {"Remember Me"}
                  </label>
                </div>

                <div className="form-group">
                  <button
                    type="submit"
                    id="login_button"
                    className="btn btn-lg btn-outline-primary w-100 mb-2"
                    data-cy="login-button"
                  >
                    {"LOGIN"}
                  </button>

                  <button
                    id="create_account_button"
                    className="btn btn-outline-secondary w-100"
                    data-cy="register-link"
                    onClick={() => {
                      window.location.href = "/account/register"
                    }}
                  >
                    {"CREATE ACCOUNT"}
                  </button>
                </div>

                <div className="form-group">
                  <label htmlFor="">
                    <a href="" className="text-leo-blue">
                      {"Forgot your password?"}
                    </a>
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginForm
