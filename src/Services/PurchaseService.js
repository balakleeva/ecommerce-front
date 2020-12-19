import ApiService from './ApiService';

export default {
	getOne(purchaseId) {
		return ApiService.get(`/purchase/${purchaseId}`)
	},
	getAll() {
		return ApiService.get('/purchase');
	},
	create(data) {
		return ApiService.post('/purchase', data);
	},
	createAdmin(data) {
		return ApiService.post('/purchase/create-admin', data);
	}
}
