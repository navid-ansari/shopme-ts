import React from 'react'

interface IErrorLoading {
  id?: string
  errorMessage?: string
}

const InlineError = (props: IErrorLoading) => {
  const { id, errorMessage } = props
  return <p>{errorMessage}</p>
}

export default InlineError

InlineError.defaultProps = {
  errorMessage: 'Error Loading Service Data'
}
