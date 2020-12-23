import React from 'react'
import { Form, Formik } from 'formik'
import { StyledRow, StyledSelect } from '../../StyledComponents'
import { Button, Card, Col, Select, Row } from 'antd'
import ClientSelector from '../../Selectors/ClientSelector'

const { Option } = Select

const OrderSearch = ({ handleSearch }) => {
  return (
    <Card title="Поиск" style={{ marginBottom: '20px' }}>
      <Formik
        initialValues={{
          clientId: '',
          isDone: null,
        }}
        onSubmit={(values) => handleSearch(values)}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <StyledRow gutter={10}>
              <Col span={6}>
                <Row>Клиент:</Row>
                <ClientSelector
                  disabled={values.withoutClient}
                  value={values.client}
                  onChange={(val) => setFieldValue('clientId', val)}
                />
              </Col>

              <Col span={6}>
                <Row>Выолнено:</Row>
                <StyledSelect onChange={(val) => setFieldValue('isDone', val)}>
                  <Option value={null}>-</Option>
                  <Option value={true}>Да</Option>
                  <Option value={false}>Нет</Option>
                </StyledSelect>
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

export default OrderSearch
