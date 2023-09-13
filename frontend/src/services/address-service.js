import { HttpClientAbstract } from './HttpClient';
import httpProvider from './providers';
import { getToken } from './token-manager';

class AddressService extends HttpClientAbstract {
    constructor(options) {
        super(options);
    }

    async getAddresses() {
        try {
            return await this.get('/');
        } catch (err) {
            throw Error(err);
        }
    };

    async createAddress(address) {
        try {
            return await this.post('/', { data: address });
        } catch (err) {
            throw Error(err);
        }
    };

    async changeAddress(updatedAddress) {
        try {
            await this.put(`/${updatedAddress.id}`, { data: updatedAddress });
        } catch (err) {
            throw Error(err);
        }
    };

    async deleteAddress(deletedAddress) {
        try {
            await this.delete(`/${deletedAddress.id}`)
        } catch (err) {
            throw Error(err);
        }
    };

}

export default new AddressService({
    httpProvider,
    baseURL: '/api/addresses',
    getToken
});
