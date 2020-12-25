import ApiService from './ApiService';

export default {
	getAll() {
		return ApiService.get('/client');
	},
	create(data) {
		return ApiService.post('/client', data);
	},
	login(data) {
		return ApiService.post('/client/auth', data)
	},
	remove(id) {
		return ApiService.delete(`/client/${id}`);
	},
	createAdmin(data) {
		return ApiService.post('/client/create-admin', data)
	}
}
