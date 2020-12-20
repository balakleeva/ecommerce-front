import ApiService from './ApiService'

export default {
  getAll() {
    return ApiService.get('/book')
  },
  getOne(bookId) {
    return ApiService.get(`/book/${bookId}`)
  },
  create(data) {
    return ApiService.post('/book', data)
  },
  delete(bookId) {
    return ApiService.delete(`/book/${bookId}`)
  },
  update(bookId, data) {
    return ApiService.put(`/book/${bookId}`, data)
  },
  getByIds(data) {
    return ApiService.get('/book/byIds', data)
  },
  search(data) {
    return ApiService.get('/book/search', data)
  },
  mostPopular() {
    return ApiService.get('/book/most-popular')
  }
}
