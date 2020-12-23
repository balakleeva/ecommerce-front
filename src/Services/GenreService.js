import ApiService from './ApiService';

export default {
  getAll() {
    return ApiService.get('/genre');
  },
  create(data) {
    return ApiService.post('/genre', data);
  },
  update(id, data) {
    return ApiService.put(`/genre/${id}`, data);
  },
  get(id) {
    return ApiService.get(`/genre/${id}`);
  },
}
