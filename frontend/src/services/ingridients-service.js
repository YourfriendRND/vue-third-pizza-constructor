import { HttpClientAbstract } from './HttpClient';
import httpProvider from './providers';
import { getToken } from './token-manager';

class IngredientsService extends HttpClientAbstract {
    constructor(options) {
        super(options);
    }

    async getIngredients() {
        try {
            return await this.get('/');
        } catch (err) {
            throw Error(err);
        }
    }

}

export default new IngredientsService({
    httpProvider,
    baseURL: '/api/ingredients',
    getToken,
});
