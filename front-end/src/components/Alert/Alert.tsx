import React from "react"

interface AlertProps {
  msg: string
  severity: string
  dataCy?: string
}

const Alert: React.FC<AlertProps> = ({ msg, severity, dataCy }) => {
  return (
    <div className={`alert alert-${severity} `} role="alert" data-cy={dataCy}>
      <span>{msg}</span>
    </div>
  )
}

export default Alert
