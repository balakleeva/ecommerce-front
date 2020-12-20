import React from 'react'
import Layout from '../../../Components/Admin/Layout'
import BookService from '../../../Services/BookService'
import { useHistory } from 'react-router-dom'
import BookForm from '../../../Components/Forms/Admin/BookForm'

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

  return (
    <Layout>
      <BookForm initValues={initValues} onSubmit={handleSubmit} />
    </Layout>
  )
}
export default AddBook
