import React from 'react'
import { DatePicker, Card, Col, Row, Button, Checkbox } from 'antd'
import { Formik, Form } from 'formik'
import { StyledRow } from '../../StyledComponents'
import ClientSelector from '../../Selectors/ClientSelector'

const PurchaseSearch = ({ handleSearch }) => {
  return (
    <Card title="Поиск" style={{ marginBottom: '20px' }}>
      <Formik
        initialValues={{
          clientId: '',
          withoutClient: false,
          buyMonth: '',
        }}
        onSubmit={(values) => handleSearch(values)}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <StyledRow gutter={10}>
              <Col span={6}>
                <Row>
                  Клиент:{' '}
                  <Checkbox
                    style={{ marginLeft: '20px' }}
                    onChange={() => {
                      setFieldValue('withoutClient', !values.withoutClient)
                    }}
                  >
                    Без клиента?
                  </Checkbox>
                </Row>
                <ClientSelector
                  disabled={values.withoutClient}
                  value={values.client}
                  onChange={(val) => setFieldValue('clientId', val)}
                />
              </Col>

              <Col span={6}>
                <Row>Месяц покупки:</Row>
                <DatePicker
                  style={{ width: '100%' }}
                  onChange={(date, dateString) =>
                    setFieldValue('buyMonth', dateString)
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

export default PurchaseSearch
