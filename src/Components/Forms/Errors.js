import Row from 'antd/lib/row'
import React from 'react'
import styled from 'styled-components'
import { ErrorMessage } from 'formik'

const Container = styled.div`
  margin-bottom: 10px;
`

export const ErrorText = styled.div`
  color: red;
`

export const FieldError = ({ name, text }) => (
  <ErrorMessage
    name={name}
    render={(msg) => (
      <Row justify="center" style={{ marginLeft: '10px' }}>
        <ErrorText>
          {msg}
        </ErrorText>
      </Row>
    )}
  />
)

export const Errors = ({ names, isSubmitting, submitCount, status }) => (
  <Container>
    {names
      ? names.map((name) => (
          <ErrorMessage
            name={name}
            render={(msg) => (
              <Row justify="center">
                <ErrorText>
                  {name} - {msg}
                </ErrorText>
              </Row>
            )}
          />
        ))
      : null}
    {!isSubmitting && submitCount > 0 && status && (
      <Row justify="center">
        <ErrorText>{status}</ErrorText>
      </Row>
    )}
  </Container>
)
