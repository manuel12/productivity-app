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
      <ul className="list-group mx-auto" data-cy={dataCyAttr}>
        {items.length < 1 ? (
          <div className="display-4">No {itemName} added yet...</div>
        ) : (
          children
        )}
      </ul>
    </div>
  )
}

export default CustomList
