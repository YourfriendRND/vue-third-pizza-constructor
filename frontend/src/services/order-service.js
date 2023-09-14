import { HttpClientAbstract } from './HttpClient';
import { getToken } from './token-manager';
import httpProvider from './providers';

class OrderService extends HttpClientAbstract {
    constructor(options) {
        super(options);
    }

    async getOrders() {
        try {
            return await this.get('/');
        } catch (err) {
            throw Error(err);
        }
    }

    async createOrder(order) {
        try {
            return await this.post('/', {
                data: { ...order }
            });
        } catch (err) {
            throw Error(err);
        }
    }

    async deleteOrder(order) {
        try {
            await this.delete(`/${order.id}`);
        } catch (err) {
            throw Error(err);
        }
    }

}

export default new OrderService({
    baseURL: '/api/orders',
    httpProvider,
    getToken
});
