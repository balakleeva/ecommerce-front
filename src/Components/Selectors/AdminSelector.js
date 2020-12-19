import React, { useEffect } from 'react'
import useRequest from '../../Utils/useRequest'
import { Select } from 'antd'
import { StyledSelect } from '../StyledComponents'
import AdminService from '../../Services/AdminService'

const { Option } = Select

function AdminSelector({ value, onChange, className }) {
  const {
    fetch,
    state: { error, isLoading, payload },
  } = useRequest(AdminService.getAll)

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

export default AdminSelector
