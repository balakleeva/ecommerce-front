import ApiService from './ApiService';

export default {
	getAll() {
		return ApiService.get('/client');
	},
	create(data) {
		return ApiService.post('/client', data);
	}
}