import React from 'react'
import { DatePicker, Card, Col, Row, Select, Button } from 'antd'
import { Formik, Form } from 'formik'
import { StyledRow, StyledSelect } from '../../StyledComponents'
import ClientSelector from '../../Selectors/ClientSelector'

const { Option } = Select

const RentSearch = ({ handleSearch }) => {
  return (
    <Card title="Поиск" style={{ marginBottom: '20px' }}>
      <Formik
        initialValues={{
          client: '',
          rentMonth: '',
          isReturned: null,
        }}
        onSubmit={(values) => handleSearch(values)}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <StyledRow gutter={10}>
              <Col span={6}>
                <Row>Клиент:</Row>
                <ClientSelector
                  value={values.client}
                  onChange={(val) => setFieldValue('client', val)}
                />
              </Col>

              <Col span={6}>
                <Row>Возращено:</Row>
                <StyledSelect
                  onChange={(val) => setFieldValue('isReturned', val)}
                >
                  <Option value={null}>-</Option>
                  <Option value={true}>Да</Option>
                  <Option value={false}>Нет</Option>
                </StyledSelect>
              </Col>

              <Col span={6}>
                <Row>Месяц аренды:</Row>
                <DatePicker
                  style={{ width: '100%' }}
                  onChange={(date, dateString) =>
                    setFieldValue('rentMonth', dateString)
                  }
                  picker="month"
                />
              </Col>

              <Col span={6} style={{ display: 'flex', alignItems: 'flex-end' }}>
                <Button htmlType="submit" block>
                  Поиск
                </Button>
              </Col>
            </StyledRow>
          </Form>
        )}
      </Formik>
    </Card>
  )
}

export default RentSearch
