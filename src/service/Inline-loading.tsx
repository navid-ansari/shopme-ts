import React from 'react'

interface IInlineLoading {
  id?: string
  loadingMessage?: string
}

const InlineLoading = (props: IInlineLoading) => {
  const { id, loadingMessage } = props
  return <p>{loadingMessage}</p>
}

export default InlineLoading

InlineLoading.defaultProps = {
  errorMessage: 'Loading Service Data...'
}
