import React from 'react'
import Layout from '../../../Components/Admin/Layout'
import BookService from '../../../Services/BookService'
import { useHistory } from 'react-router-dom'
import BookForm from '../../../Components/Forms/Admin/BookForm'
import * as Yup from 'yup'
import { numberValidator, stringValidator } from '../../../validators'

const AddBook = () => {
  const { push } = useHistory()

  const handleSubmit = (values) => {
    BookService.create(values).then((response) => push('/admin/books'))
  }

  const initValues = {
    name: '',
    genreId: '',
    authorId: '',
    publisher: '',
    publishYear: '',
    image: '',
    buyPrice: '',
    rentPrice: '',
    quantity: 1,
  }

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

  return (
    <Layout>
      <BookForm
        initValues={initValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      />
    </Layout>
  )
}
export default AddBook
