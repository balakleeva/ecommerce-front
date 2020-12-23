import React, { useEffect } from 'react'
import Layout from '../../../Components/Admin/Layout'
import { Content } from '../../../Components/StyledComponents'
import BookForm from '../../../Components/Forms/Admin/BookForm'
import { useHistory, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { numberValidator, stringValidator } from '../../../validators'
import OrderService from '../../../Services/OrderService'
import useRequest from '../../../Utils/useRequest'

const MakeOrder = () => {
  const { orderId } = useParams()
  const { push } = useHistory()

  const {
    fetch,
    state: { error, isLoading, payload },
  } = useRequest(OrderService.getOne)

  useEffect(() => {
    fetch(orderId)
  }, [])

  const validationSchema = Yup.object().shape({
    name: stringValidator,
    genreId: stringValidator,
    authorId: stringValidator,
    publisher: stringValidator,
    publishYear: stringValidator,
    image: stringValidator,
    buyPrice: numberValidator,
    rentPrice: numberValidator,
    quantity: numberValidator,
  })

  const handleSubmit = (values) => {
    OrderService.makeDone(orderId, values).then((response) => {
      push('/admin/orders')
    })
  }

  return (
    <Layout>
      <Content>
        {payload && (
          <BookForm
            initValues={{
              name: payload.bookName,
              genreId: '',
              authorId: '',
              publisher: '',
              publishYear: '',
              image: '',
              buyPrice: '',
              rentPrice: '',
              quantity: 1,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          />
        )}
      </Content>
    </Layout>
  )
}

export default MakeOrder
