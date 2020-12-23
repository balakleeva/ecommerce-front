import ApiService from './ApiService'

export default {
  getAll() {
    return ApiService.get('/author')
  },
  create(data) {
    return ApiService.post('/author', data)
  },
  update(id, data) {
    return ApiService.put(`/author/${id}`, data);
  },
  get(id) {
    return ApiService.get(`/author/${id}`);
  },
  remove(id) {
    return ApiService.delete(`/author/${id}`);
  },
}
