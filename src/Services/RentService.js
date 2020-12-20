import ApiService from './ApiService'

export default {
  getOne(rentId) {
    return ApiService.get(`/rent/${rentId}`)
  },
  getAll() {
    return ApiService.get('/rent')
  },
  create(data) {
    return ApiService.post('/rent', data)
  },
  createAdmin(data) {
    return ApiService.post('/rent/create-admin', data)
  },
  updateReturn(rentId) {
    return ApiService.put(`/rent/${rentId}`)
  },
  search(data) {
    return ApiService.get('/rent/search', data)
  },
}
