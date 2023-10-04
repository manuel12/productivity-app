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
    <div className="mx-auto w-50">
      <ul className="list-group" data-cy={dataCyAttr}>
        {items.length > 0 ? (
          children
        ) : (
          <div className="display-4">No {itemName} added yet...</div>
        )}
      </ul>
    </div>
  )
}

export default CustomList
