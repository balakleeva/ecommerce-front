import ApiService from './ApiService'

export default {
  getAll() {
    return ApiService.get('/staff')
  },
  create(data) {
    return ApiService.post('/staff', data)
  },
  auth(data) {
    return ApiService.post('/staff/auth', data)
  },
  search(data) {
    return ApiService.get('/staff/search', data)
  },
  get(id) {
    return ApiService.get(`/staff/${id}`)
  },
  update(id, data) {
    return ApiService.put(`/staff/${id}`, data)
  },
}
