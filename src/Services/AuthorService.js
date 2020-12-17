import ApiService from './ApiService'

export default {
  getAll() {
    return ApiService.get('/author')
  },
  create(data) {
    return ApiService.post('/author', data)
  },
}
