import React, { ReactNode } from "react"

interface CustomInputProps {
  itemName: string
  handleAddItem: (e: any) => void
  newItem: { text: string }
  onChange: (e: any) => void
}

const CustomInput: React.FC<CustomInputProps> = ({
  itemName,
  handleAddItem,
  newItem,
  onChange,
}) => {
  return (
    <form onSubmit={handleAddItem} data-cy={`${itemName}-form`}>
      <div className="input-group my-5 mx-auto w-50">
        <input
          type="text"
          className="form-control mx-1 TodoList__input"
          data-cy={`${itemName}-input`}
          placeholder={`Add a new ${itemName}...`}
          aria-label={`Add a new ${itemName}...`}
          aria-describedby="button-addon2"
          value={newItem.text}
          onChange={onChange}
          maxLength={40}
        />

        <button
          style={{
            borderRadius: "20px",
          }}
          className="btn btn-primary"
          data-cy={`${itemName}-submit`}
          type="submit"
          id="button-addon2"
        >
          Add todo
        </button>
      </div>
    </form>
  )
}

export default CustomInput
