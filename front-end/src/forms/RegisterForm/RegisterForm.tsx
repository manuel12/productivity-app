import React, { useState } from "react"
import LabeledInput from "../../components/LabeledInput/LabeledInput"
import FormAlert from "../../components/FormAlert/FormAlert"

import API from "../../api"

import {
  IRegisterUser,
  IRegisterSuccessResponse,
  IRegisterErrorResponse,
} from "../../interfaces/interfaces"

import { useForm, FieldErrors } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import YupPassword from "yup-password"

YupPassword(yup)

const RegisterForm = () => {
  const schema = yup.object({
    username: yup
      .string()
      .required("A username is required.")
      .min(6, "Username must be at least 6 characters.")
      .max(19, "Username must be shorter than 20 characters."),
    email: yup
      .string()
      .required("An email address is required.")
      .email("Email must be valid.")
      .min(6, "Email must be at least 6 characters.")
      .max(254, "Email must be shorter than 255 characters."),
    password: yup
      .string()
      .required("A password is required.")
      .password()
      .min(8, "Password must be at least 8 characters.")
      .max(128, "Password must be less than 128 characters.")
      .minLowercase(1, "Password must contain at least 1 lowercase character.")
      .minUppercase(1, "Password must contain at least 1 uppercase character.")
      .minNumber(1, "Password must contain at least 1 number character.")
      .minSymbols(1, "Password must contain at least 1 special character."),
    "password-confirmation": yup
      .string()
      .required("A password confirmation is required.")
      .oneOf([yup.ref("password")], "Passwords do not match."),
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
      (res: IRegisterErrorResponse) => {
        setAlertMessageText(res.response.data.error)
        setInvalidCredentialsError(true)
      },
      (res: IRegisterSuccessResponse) => {
        setAlertMessageText(res.message)
        setUserRegisteredSuccessfully(true)

        setTimeout(() => (window.location.href = "/account/login"), 500)
      }
    )
  }

  const invalidSubmit = (errors: FieldErrors<IRegisterUser>) => {
    setInvalidCredentialsError(true)
    if (getValues("password") !== getValues("password-confirmation")) {
      setPasswordsNotMatchError(true)
    }
  }

  return (
    <>
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
                  placeholder={"Username"}
                  registerLabel="username"
                  register={register}
                  required
                  errors={errors}
                  errorLabel={"A username is required."}
                  dataCy="username"
                />
                <LabeledInput
                  //   label={"Email"}
                  placeholder={"Email"}
                  registerLabel="email"
                  register={register}
                  pattern={{
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address.",
                  }}
                  required
                  errors={errors}
                  errorLabel={"An email address is required."}
                  dataCy="email"
                />
                <LabeledInput
                  type="password"
                  label={"Password"}
                  placeholder={"Password"}
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
                  placeholder={"Password confirmation"}
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
              </form>
              <div className="mb-3" data-cy="login-section">
                <label>Already have an account?</label>
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
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterForm
