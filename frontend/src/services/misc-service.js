import { HttpClientAbstract } from './HttpClient';
import httpProvider from './providers';
import { getToken } from './token-manager';

class MiscService extends HttpClientAbstract {
    constructor(options) {
        super(options);
    }

    async getMisc() {
        try {
            return await this.get('/');
        } catch (err) {
            throw Error(err);
        }
    }

}

export default new MiscService({
    baseURL: '/api/misc',
    httpProvider,
    getToken,
});
