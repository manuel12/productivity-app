import React, { useState } from "react"
import LabeledInput from "../../components/LabeledInput/LabeledInput"
import FormAlert from "../../components/FormAlert/FormAlert"

import API from "../../api"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import YupPassword from "yup-password"

YupPassword(yup)

const RegisterForm = () => {
  const schema = yup.object({
    username: yup
      .string()
      .required("A username is required.")
      .min(6, "Username must be at least 6 characters."),
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
    "password-confirmation": yup
      .string()
      .required("A password confirmation is required."),

    // .min(8, "Password must contain at least 8 characters.")
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    //   "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character."
    // ),
  })

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
    resolver: yupResolver(schema),
  })

  const [userRegisteredSuccessfully, setUserRegisteredSuccessfully] =
    useState(false)
  const [invalidCredentialsError, setInvalidCredentialsError] = useState(false)
  const [alertMessageText, setAlertMessageText] = useState("")

  const [passwordsNotMatchError, setPasswordsNotMatchError] = useState(false)

  const validSubmit = (data: any) => {
    const username = data.username
    const email = data.email
    const password = data.password

    const newUserCredentials = { username, email, password }

    API.register(
      newUserCredentials,
      (res: any) => {
        console.warn(res.error)
        setAlertMessageText(res.error)
        setInvalidCredentialsError(true)
      },
      (res: any) => {
        console.warn(res.message)
        setAlertMessageText(res.message)

        console.log("User registered successfully!")
        setUserRegisteredSuccessfully(true)

        setTimeout(() => (window.location.href = "/account/login"), 500)
      }
    )
  }

  const invalidSubmit = (data: any) => {
    setInvalidCredentialsError(true)
    if (getValues("password") !== getValues("password-confirmation")) {
      setPasswordsNotMatchError(true)
    }
  }

  return (
    <>
      {" "}
      <FormAlert
        displayAlert={userRegisteredSuccessfully || invalidCredentialsError}
        msgs={[
          "User successfully registered!",
          "Username, email or password invalid.",
        ]}
        success={userRegisteredSuccessfully}
        messageBypass={alertMessageText}
      />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body" data-cy="register-form">
              <form onSubmit={handleSubmit(validSubmit, invalidSubmit)}>
                <LabeledInput
                  autoFocus={true}
                  label={"Username"}
                  registerLabel="username"
                  register={register}
                  // className="text-dark"
                  required
                  errors={errors}
                  errorLabel={"A username is required."}
                  dataCy="username"
                />
                <LabeledInput
                  label={"Email"}
                  registerLabel="email"
                  register={register}
                  pattern={{
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address.",
                  }}
                  // className="text-dark"
                  required
                  errors={errors}
                  errorLabel={"An email address is required."}
                  dataCy="email"
                />
                <LabeledInput
                  type="password"
                  label={"Password"}
                  registerLabel="password"
                  register={register}
                  required
                  errors={errors}
                  errorLabel={"A password is required."}
                  dataCy="password"
                />
                <LabeledInput
                  type="password"
                  label={"Password confirmation"}
                  registerLabel="password-confirmation"
                  register={register}
                  required
                  errors={
                    passwordsNotMatchError
                      ? {
                          ["password-confirmation"]: {
                            message: "Passwords do not match.",
                          },
                        }
                      : errors
                  }
                  errorLabel={"A password confirmation is required."}
                  dataCy="password-confirmation"
                />

                <button
                  type="submit"
                  id="register-button"
                  aria-label="register button"
                  className="btn btn-outline-primary w-100"
                  data-cy="register-button"
                >
                  {"REGISTER"}
                </button>

                <div className="mb-3">
                  <label>{"Already have an account? "}</label>
                  <button
                    id="login-button"
                    className="btn btn-outline-secondary w-100"
                    aria-label="login button"
                    data-cy="login-button"
                    onClick={() => {
                      window.location.href = "/"
                    }}
                  >
                    {"LOGIN"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterForm
