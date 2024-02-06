import React from "react"

import Alert from "../../components/Alert/Alert"

interface FormAlertProps {
  displayAlert: boolean
  msgs: string[]
  success?: boolean
  messageBypass?: string
}

const FormAlert: React.FC<FormAlertProps> = ({
  displayAlert = false,
  msgs,
  success = false,
  messageBypass = "",
}) => {
  let displayMsg = success ? msgs[0] : msgs[1]
  messageBypass && (displayMsg = messageBypass)
  return displayAlert ? (
    <Alert
      msg={displayMsg}
      severity={success ? "success" : "danger"}
      dataCy={`form-action-${success ? "success" : "error"}`}
    />
  ) : null
}

export default FormAlert
