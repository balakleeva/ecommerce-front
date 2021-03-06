import React, { useEffect } from 'react'
import useRequest from '../../Utils/useRequest'
import GenreService from '../../Services/GenreService'
import { Select } from 'antd'
import { StyledSelect } from '../StyledComponents'

const { Option } = Select

function GenreSelector({ value, onChange, className }) {
  const {
    fetch,
    state: { error, isLoading, payload },
  } = useRequest(GenreService.getAll)

  useEffect(() => {
    fetch()
  }, [])

  return (
    <>
      {error && <div>{JSON.stringify(error)}</div>}
      {isLoading && <div>loader</div>}
      {payload && (
        <StyledSelect onChange={onChange} value={value}>
          <Option value="">-</Option>
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

export default GenreSelector
