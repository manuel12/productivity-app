import React, { ReactNode } from "react"

interface CustomPageProps {
  headingText: string
  dataCyAttr: string
  children: ReactNode
}
const CustomPage: React.FC<CustomPageProps> = ({
  headingText = "",
  dataCyAttr = "",
  children,
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
