import React from "react"

interface LabeledInputProps {
  autoFocus?: boolean
  label?: string
  type?: string
  register?: any
  registerLabel?: string
  required?: boolean
  pattern?: any
  placeholder?: string
  errors?: any
  errorLabel?: string
  dataCy?: string
}

const LabeledInput: React.FC<LabeledInputProps> = ({
  autoFocus = false,
  label = "",
  type = "text",
  register = () => [],
  registerLabel,
  required = false,
  pattern = "",
  placeholder,
  errors = {},
  errorLabel = "",
  dataCy = "labeled-input",
}) => {
  return (
    <div className="mb-3">
      <label htmlFor="email" className="form-label w-100 text-dark text-start">
        {label}
      </label>
      {registerLabel && errors[registerLabel] && (
        <label
          htmlFor="email"
          className="form-label w-100 text-danger text-start fw-bold"
        >
          {errors[registerLabel].message}
        </label>
      )}
      <input
        type={type}
        id={dataCy}
        className={`form-control`}
        placeholder={placeholder}
        {...register(registerLabel, {
          required: errorLabel,
          pattern: pattern ? pattern : "",
        })}
        data-cy={dataCy}
        autoFocus={autoFocus}
      />
    </div>
  )
}

export default LabeledInput
