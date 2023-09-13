import { HttpClientAbstract } from './HttpClient';
import httpProvider from './providers';
import { getToken } from './token-manager';

class DoughService extends HttpClientAbstract {
    constructor(options) {
        super(options);
    }

    async getDough() {
        try {
            return this.get('/');
        } catch (err) {
            throw Error(err);
        }
    }
    
}

export default new DoughService({
    httpProvider,
    baseURL: '/api/dough',
    getToken
});
