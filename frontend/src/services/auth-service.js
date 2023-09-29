import httpProvider from '@/services/providers/index';
import { HttpClientAbstract } from './HttpClient';
import { getToken } from './token-manager';

class AuthService extends HttpClientAbstract {
    constructor(options) {
        super(options);
    }

    async login(email, password) {
        try {
            return await this.post('/login', {
                data: {
                    email,
                    password
                }
            });
        } catch (error) {
            throw Error(error);
        }
    };

    async whoAmI() {
        try {
            return await this.get('/whoAmI');
        } catch (error) {
            throw Error(error);
        }
    };

    async logout() {
        try {
            return await this.delete('/logout');
        } catch (error) {
            throw Error(error);
        }
    }

}

export default new AuthService({
    httpProvider,
    baseURL: '/api',
    getToken
});
