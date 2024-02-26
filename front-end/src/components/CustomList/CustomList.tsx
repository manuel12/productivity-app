import "./styles.css"
import React, { ReactNode } from "react"

interface CustomListProps {
  items: any
  itemName: string
  dataCyAttr: string
  children: ReactNode
}

const CustomList: React.FC<CustomListProps> = ({
  items,
  itemName = "",
  dataCyAttr = "",
  children,
}) => {
  return (
    <div className="mx-auto mb-5">
      {items.length < 1 ? (
        <div className="display-4">No {itemName} added yet...</div>
      ) : (
        <ul
          className="list-group mx-auto CL__unordered-list"
          data-cy={dataCyAttr}
          role="list" //
          aria-label={`List of ${itemName}`}
        >
          {children}
        </ul>
      )}
    </div>
  )
}

export default CustomList
