import ApiService from './ApiService';

export default {
  getAll() {
    return ApiService.get('/genre');
  },
  create(data) {
    return ApiService.post('/genre', data);
  }
}
