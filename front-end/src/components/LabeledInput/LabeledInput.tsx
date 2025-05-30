import React from "react"

interface LabeledInputProps {
  autoFocus?: boolean
  label?: string
  type?: string
  register?: any
  registerLabel?: string
  required?: boolean
  pattern?: {
    value: RegExp
    message: string
  }
  placeholder?: string
  errors?: any
  errorLabel?: string
  dataCy?: string
}

const LabeledInput: React.FC<LabeledInputProps> = ({
  autoFocus = false,
  label = "",
  type = "text",
  register = () => ({
    name: "",
    onChange: () => {},
    onBlur: () => {},
    ref: () => {},
  }), // Default register function

  registerLabel,
  required = false,
  pattern,
  placeholder,
  errors = {},
  errorLabel = "",
  dataCy = "labeled-input",
}) => {
  return (
    <div className="mb-3">
      {label && (
        <label
          htmlFor={dataCy}
          className="form-label w-100 text-dark text-start"
        >
          {label}
        </label>
      )}
      {registerLabel && errors[registerLabel] && (
        <label
          htmlFor={dataCy}
          className="form-label w-100 text-danger text-start fw-bold"
          data-cy={`${dataCy}-error-label`}
          aria-live="polite"
        >
          {errors[registerLabel].message}
        </label>
      )}
      <input
        type={type}
        id={dataCy}
        className={`form-control`}
        placeholder={placeholder}
        {...(registerLabel && register
          ? register(registerLabel, {
              required: required ? errorLabel : false,
              pattern: pattern, // Pass pattern as-is (undefined or { value, message })
            })
          : {})}
        data-cy={dataCy}
        autoFocus={autoFocus}
        aria-invalid={errors ? "true" : "false"}
        aria-describedby={`${dataCy}-error-label`}
      />
    </div>
  )
}

export default LabeledInput
