import React, { ReactNode, ComponentType } from "react"

interface CustomPageProps {
  headingText: string
  dataCyAttr: string
  // listComponent: ComponentType<any>
  children: ReactNode
}
const CustomPage: React.FC<CustomPageProps> = ({
  headingText = "",
  dataCyAttr = "",
  children,
  // listComponent: ListComponent,
}) => {
  return (
    <div className="my-5">
      <h1 className="display-1" data-cy={dataCyAttr}>
        {headingText}
      </h1>
      {children}
    </div>
  )
}

export default CustomPage
