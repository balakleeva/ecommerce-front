import React, { useEffect } from 'react'
import useRequest from '../../Utils/useRequest'
import { Select } from 'antd'
import { StyledSelect } from '../StyledComponents'
import ClientService from '../../Services/ClientService'

const { Option } = Select

function ClientSelector({
  value,
  onChange,
  className,
  multiple = false,
  disabled = false,
}) {
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
        <StyledSelect
          disabled={disabled}
          onChange={onChange}
          value={value}
          mode={multiple ? 'multiple' : 'default'}
        >
          <Option value="">-</Option>
          {payload &&
            payload.map(({ id, name }) => (
              <Option key={id} value={id}>
                {name}
              </Option>
            ))}
        </StyledSelect>
      )}
    </>
  )
}

export default ClientSelector
