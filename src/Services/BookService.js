import ApiService from './ApiService';

export default {
  getAll() {
    return ApiService.get('/book');
  },
  getOne(bookId) {
    return ApiService.get(`/book/${bookId}`);
  },
  create(data) {
    return ApiService.post('/book', data);
  },
};
