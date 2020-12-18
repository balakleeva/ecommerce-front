import React from 'react'
import Layout from '../../../Components/Admin/Layout'
import { Content } from '../../../Components/StyledComponents'
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
  }

  return (
    <Layout>
      <Content>
        <BookForm initValues={initValues} onSubmit={handleSubmit} />
      </Content>
    </Layout>
  )
}
export default AddBook
