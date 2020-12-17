import React, { useEffect } from 'react'
import useRequest from '../../Utils/useRequest'
import { Select } from 'antd'
import AuthorService from '../../Services/AuthorService'
import { StyledSelect } from '../StyledComponents'

const { Option } = Select

function AuthorSelector({ value, onChange, className }) {
  const {
    fetch,
    state: { error, isLoading, payload },
  } = useRequest(AuthorService.getAll)

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

export default AuthorSelector
