import React from 'react'
import { Select } from 'antd'
import { StyledSelect } from '../StyledComponents'

const { Option } = Select

function RoleSelector({ value, onChange, className }) {
  return (
    <StyledSelect onChange={onChange} value={value}>
      <Option value="мастер_чистоты">Мастер чистоты</Option>
      <Option value="бухгалтер">Бухгалтер</Option>
      <Option value="продавец">Продавец</Option>
      <Option value="менеджер">Менеджер</Option>
      <Option value="директор">Директор</Option>
    </StyledSelect>
  )
}

export default RoleSelector
