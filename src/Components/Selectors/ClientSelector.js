import React, { useEffect } from 'react'
import useRequest from '../../Utils/useRequest'
import { Select } from 'antd'
import { StyledSelect } from '../StyledComponents'
import ClientService from '../../Services/ClientService'

const { Option } = Select

function ClientSelector({ value, onChange, className }) {
  const {
    fetch,
    state: { error, isLoading, payload },
  } = useRequest(ClientService.getAll)

  useEffect(() => {
    fetch()
  }, [])

  return (
    <>
      {error && <div>{JSON.stringify(error)}</div>}
      {isLoading && <div>loader</div>}
      {payload && (
        <StyledSelect onChange={onChange} value={value}>
          {payload &&
            payload.map(({ id, name, genreType }) => (
              <Option key={id} value={id}>
                {name} - {genreType}
              </Option>
            ))}
        </StyledSelect>
      )}
    </>
  )
}

export default ClientSelector
