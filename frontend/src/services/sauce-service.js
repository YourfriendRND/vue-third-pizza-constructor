import { HttpClientAbstract } from './HttpClient';
import { getToken } from './token-manager';
import httpProvider from './providers';

class SauceService extends HttpClientAbstract {
    constructor(options) {
        super(options);
    }

    async getSauce() {
        try {
            return await this.get('/');
        } catch (err) {
            throw Error(err);
        }
    }

}

export default new SauceService({
    baseURL: '/api/sauces',
    httpProvider,
    getToken
});
