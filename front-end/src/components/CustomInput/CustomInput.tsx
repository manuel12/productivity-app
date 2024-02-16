import "./styles.css"
import React from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

interface CustomInputProps {
  itemName: string
  handleAddItem: (data: any, e: any) => void
  schema: any
}

const CustomInput: React.FC<CustomInputProps> = ({
  itemName,
  handleAddItem,
  schema,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
    resolver: yupResolver(schema),
  })

  return (
    <form
      onSubmit={handleSubmit(
        (data: any, e: any) => {
          console.log("Submit successful!")
          handleAddItem(data, e)
          setValue(itemName, "")
        },
        (data: any) => {
          console.log("Submit unsuccessful!")
        }
      )}
      data-cy={`${itemName}-form`}
    >
      <div className="input-group my-5 mx-auto CI_input-container">
        {errors && (
          <label
            className="d-block w-100 form-label text-danger mx-auto CI_input-label"
            data-cy="input-error-label"
          >
            {errors[itemName]?.message && String(errors[itemName]?.message)}
          </label>
        )}
        <input
          className="form-control mx-auto CI__input "
          data-cy={`${itemName}-input`}
          {...register(itemName)}
          placeholder={`Add new ${itemName}...`}
          aria-label={`Add new ${itemName}...`}
          aria-describedby="button-addon2"
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
