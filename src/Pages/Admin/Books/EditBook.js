import React, { useEffect } from 'react'
import Layout from '../../../Components/Admin/Layout'
import BookService from '../../../Services/BookService'
import { useHistory, useParams } from 'react-router-dom'
import useRequest from '../../../Utils/useRequest'
import BookForm from '../../../Components/Forms/Admin/BookForm'
import Loader from '../../../Components/Loader'

const AddBook = () => {
  const { push } = useHistory()
  const { bookId } = useParams()

  const {
    fetch,
    state: { error, isLoading, payload },
  } = useRequest(BookService.getOne)

  useEffect(() => {
    fetch(bookId)
  }, [])

  const handleSubmit = (values) => {
    BookService.update(bookId, values).then(() => push('/admin/books'))
  }

  return (
    <Layout>
      {isLoading && <Loader />}
      {!isLoading && payload && (
        <BookForm
          initValues={{
            name: payload.name,
            genreId: payload.genreId,
            authorId: payload.authorId,
            publisher: payload.publisher,
            publishYear: payload.publishYear,
            image: payload.image,
            buyPrice: payload.buyPrice,
            rentPrice: payload.rentPrice,
            quantity: payload.quantity,
          }}
          onSubmit={handleSubmit}
        />
      )}
    </Layout>
  )
}
export default AddBook
