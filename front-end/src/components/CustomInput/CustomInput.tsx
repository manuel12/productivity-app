import "./styles.css"
import React, { useState } from "react"

interface CustomInputProps {
  itemName: string
  handleAddItem: (e: any) => void
  newItem: { description: string }
  onChange: (e: any) => void
}

const CustomInput: React.FC<CustomInputProps> = ({
  itemName,
  handleAddItem,
  newItem,
  onChange,
}) => {
  const [errorLabel, setErrorLabel] = useState("")

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (newItem.description.length < 3)
          setErrorLabel("Todos cannot be less than 3 characters")
        else if (newItem.description.length > 39)
          return setErrorLabel("Todos cannot be more than 40 characters")
        else {
          setErrorLabel("")
          handleAddItem(e)
        }
      }}
      data-cy={`${itemName}-form`}
    >
      <div className="input-group my-5 mx-auto CI_input-container">
        {errorLabel && (
          <label
            className="d-block w-100 form-label text-danger mx-auto CI_input-label"
            data-cy="input-error-label"
          >
            {errorLabel}
          </label>
        )}
        <input
          type="text"
          className="form-control mx-auto CI__input "
          data-cy={`${itemName}-input`}
          placeholder={`Add new ${itemName}...`}
          aria-label={`Add new ${itemName}...`}
          aria-describedby="button-addon2"
          value={newItem.description}
          onChange={onChange}
          maxLength={40}
        />

        <button
          style={{
            borderRadius: "20px",
          }}
          className="form-control btn btn-primary CI__button"
          data-cy={`${itemName}-submit`}
          type="submit"
          id="button-addon2"
        >
          Add Todo
        </button>
      </div>
    </form>
  )
}

export default CustomInput
