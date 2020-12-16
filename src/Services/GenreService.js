import ApiService from './ApiService';

export default {
  getAll() {
    return ApiService.get('/genre');
  },
  create(data) {
    console.log('..........222', data);
    return ApiService.post('/genre', data);
  }
}
