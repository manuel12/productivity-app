import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import LabeledInput from "../../components/LabeledInput/LabeledInput"
import FormAlert from "../../components/FormAlert/FormAlert"

import API from "../../api"
import { getItem, setItem, setUserLoggedInKey } from "../../utils"

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import YupPassword from "yup-password"

YupPassword(yup)

interface LoginFormProps {
  setLogin: (login: boolean) => any
}

const LoginForm: React.FC<LoginFormProps> = ({ setLogin }) => {
  const [rememberMe, setRememberMe] = useState(getItem("rememberMe"))
  const [userLoginSuccessfull, setUserLoginSuccessfull] = useState(false)
  const [invalidCredentialsError, setInvalidCredentialsError] = useState(false)

  const schema = yup.object({
    email: yup
      .string()
      .required("An email address is required.")
      .email("Email must be valid."),
    password: yup
      .string()
      .required("A password is required.")
      .password()

      .min(8, "Password must be at least 8 characters.")
      .minLowercase(1, "Password must contain at least 1 lowercase character.")
      .minUppercase(1, "Password must contain at least 1 uppercase character.")
      .minNumber(1, "Password must contain at least 1 number character.")
      .minSymbols(1, "Password must contain at least 1 special character."),
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
    resolver: yupResolver(schema),
  })

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
                    label="Email"
                    placeholder={"Email"}
                    registerLabel="email"
                    register={register}
                    required
                    errors={errors}
                    errorLabel={"An email address is required."}
                    dataCy="email"
                  />
                </div>

                <div className="form-group">
                  <LabeledInput
                    type="password"
                    label="Password"
                    placeholder={"Password"}
                    registerLabel="password"
                    register={register}
                    required
                    errors={errors}
                    errorLabel={"A password is required."}
                    dataCy="password"
                  />
                </div>

                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    id="remember-me-button"
                    className="form-check-input"
                    data-cy="remember-me-button"
                    aria-label="remember me checkbox"
                    defaultChecked={rememberMe}
                    onClick={handleRememberMeClick}
                  />
                  <label
                    className="form-check-label float-start"
                    data-cy="remember-me"
                    htmlFor="user_remember_me"
                    aria-labelledby="remember-me-button"
                  >
                    {"Remember Me"}
                  </label>
                </div>

                <div className="form-group">
                  <button
                    type="submit"
                    id="login-button"
                    aria-label="login button"
                    className="btn btn-lg btn-outline-primary w-100 mb-2"
                    data-cy="login-button"
                  >
                    {"LOGIN"}
                  </button>

                  <button
                    id="register-button"
                    aria-label="register button"
                    className="btn btn-outline-secondary w-100"
                    data-cy="register-button"
                    onClick={() => {
                      window.location.href = "/account/register"
                    }}
                  >
                    {"CREATE ACCOUNT"}
                  </button>
                </div>

                <div className="form-group">
                  <label htmlFor="" aria-label="forgot your password link">
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
