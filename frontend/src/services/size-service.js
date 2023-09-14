import { HttpClientAbstract } from './HttpClient';
import { getToken } from './token-manager';
import httpProvider from './providers';

class SizeService extends HttpClientAbstract {
    constructor(options) {
        super(options);
    }

    async getSizes() {
        try {
            return await this.get('/');
        } catch (err) {
            throw Error(err);
        }
    }
}

export default new SizeService({
    baseURL: '/api/sizes',
    httpProvider,
    getToken
})
