import React, { ReactNode, ComponentType } from "react"

interface CustomPageProps {
  headingText: string
  dataCyAttr: string
  listComponent: ComponentType<any>
}
const CustomPage: React.FC<CustomPageProps> = ({
  headingText = "",
  dataCyAttr = "",
  listComponent: ListComponent,
}) => {
  return (
    <div className="my-5">
      <h1 className="display-1" data-cy={dataCyAttr}>
        {headingText}
      </h1>
      <ListComponent />
    </div>
  )
}

export default CustomPage
