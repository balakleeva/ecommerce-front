import ApiService from './ApiService'

export default {
  create(data) {
    return ApiService.post('/order', data)
  },
  getAll() {
    return ApiService.get('/order')
  },
  getOne(orderId) {
    return ApiService.get(`/order/${orderId}`)
  },
  makeDone(orderId, data) {
    return ApiService.post(`/order/make-done/${orderId}`, data)
  },
  search(data) {
    return ApiService.get('/order/search', data)
  },
}
