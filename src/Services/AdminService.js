import ApiService from './ApiService'

export default {
  getAll() {
    return ApiService.get('/admin')
  },
  create(data) {
    return ApiService.post('/admin', data)
  },
  auth(data) {
    return ApiService.post('/admin/auth', data)
  },
  search(data) {
    return ApiService.get('/admin/search', data)
  }
}
