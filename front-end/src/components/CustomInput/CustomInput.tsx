import "./styles.css"
import React from "react"
import {
  useForm,
  SubmitHandler,
  SubmitErrorHandler,
  FieldErrors,
  Path,
  PathValue,
} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { AnyObjectSchema } from "yup"

import { ITodo, IDaily } from "../../interfaces/interfaces"

type ItemNameType = "todo" | "daily"

interface CustomInputProps<T> {
  itemName: ItemNameType
  handleAddItem: (data: T, e?: React.BaseSyntheticEvent) => void
  schema: AnyObjectSchema
}

const CustomInput = <T extends IDaily | ITodo>({
  itemName, // Default value with Path<T>
  handleAddItem,
  schema,
}: CustomInputProps<T>) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<T>({
    criteriaMode: "all",
    resolver: yupResolver(schema),
  })

  const errorMessage = (
    errors[itemName as keyof T] as { message?: string | undefined }
  )?.message

  const onSubmit: SubmitHandler<T> = (data: T, e) => {
    console.log("onSubmit!")
    console.log(data)
    handleAddItem(data, e)
    setValue(itemName as Path<T>, "" as PathValue<T, Path<T>>)
  }

  const onInvalidSubmit: SubmitErrorHandler<T> = (data: FieldErrors<T>) => {
    console.log("onInvalidSubmit!")
    console.log(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}
      data-cy={`${itemName}-form`}
    >
      <div className="input-group my-5 mx-auto CI_input-container">
        {errorMessage && (
          <label
            htmlFor={itemName}
            id={`${itemName}-error`}
            className="d-block w-100 form-label text-danger mx-auto CI_input-label"
            data-cy="input-error-label"
            aria-live="assertive"
          >
            {errorMessage && String(errorMessage)}
          </label>
        )}
        <input
          id={itemName}
          className="form-control mx-auto CI__input "
          data-cy={`${itemName}-input`}
          {...register(itemName as Path<T>)}
          placeholder={`Add new ${itemName}...`}
          aria-label={`${itemName} input`}
          aria-describedby={`${itemName}-error`}
        />

        <button
          style={{
            borderRadius: "20px",
          }}
          className="form-control btn btn-primary CI__button"
          data-cy={`${itemName}-submit`}
          type="submit"
          role="button"
          aria-label={`${itemName} submit button`}
          id={`${itemName}-submit`}
        >
          Add Todo
        </button>
      </div>
    </form>
  )
}

export default CustomInput
