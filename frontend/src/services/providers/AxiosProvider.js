import axios from 'axios';
import { HttpMethods } from '../../common/constants';

export default class AxiosProvider {
    constructor() {
        this.interceptors = [];
    }

    computeQuery(query) {
        if (!query) {
            return '';
        }

        const queryParams = new URLSearchParams(query);
        return `?${queryParams}`;
    };

    addInterceptor(interceptor) {
        if (interceptor && interceptor.onError) {
            this.interceptors.push(interceptor);
        } else {
            throw Error('Interceptor couldn\'t be used');
        }
        return this;
    };

    onError(error) {
        if (error instanceof Error) {
            const { message, statusCode } = error;
            this.interceptors.forEach((inteceptor) => {
                if (inteceptor.onError) {
                    inteceptor.onError(statusCode, message);
                }

                throw Error(message);
            });
        }
        throw Error(response.message);
    }

    async makeRequest(options) {
        const axiosRequestMethod = axios[options.method];
        const body = options.data ? JSON.stringify(options.data) : null;
        const url = options.baseURL + options.path + this.computeQuery(options.query);
        return await axiosRequestMethod(url, body, options.config)
            .then((res) => res.data ? res.data : null)
            .catch(this.onError)
    };

    async get (path, requestOptions) {
		return await this.makeRequest({ path, method: HttpMethods.Get, ...requestOptions });
	};
	
	async post (path, requestOptions) {
		return await this.makeRequest({ path, method: HttpMethods.Post, ...requestOptions });
	};
	
    async patch (path, requestOptions) {
		return await this.makeRequest({ path, method: HttpMethods.Patch, ...requestOptions });
	};

	async put (path, requestOptions) {
		return await this.makeRequest({ path, method: HttpMethods.Put, ...requestOptions });
	};
	
	async delete (path, requestOptions) {
		return await this.makeRequest({ path, method: HttpMethods.Delete, ...requestOptions });
	};

}