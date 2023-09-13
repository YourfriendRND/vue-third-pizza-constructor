export class HttpClientAbstract {
    
    constructor(options) {
        if (new.target === HttpClientAbstract) {
            throw Error('Can\'t create instance of HttpClientAbstract, please extand concreate class from HttpClientAbstract');
        }

        if (!options.baseURL) {
            throw Error(`[${new.target.name}]: baseURL option is empty, please set it`);
        }

        this.httpProvider = options.provider;
        this.baseURL = options.baseURL;
        this.getToken = options.getToken;
    }

    buildRequest(options = {}) {
        const token = this.getToken();
        const defaultHeaders = {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        };

        const headers = options.headers ? {
            ...options.headers,
            ...defaultHeaders
        } : defaultHeaders;

        return {
            baseUrl: this.baseURL,
            headers,
            ...options
        };
    };

    checkPath(path) {
		if (!path.startsWith('/')) {
			throw Error('The path of source should be starts with /', path);
		}
	};

    async get (path, options) {
		this.checkPath(path);
		return this.httpProvider.get(path, this.buildRequest(options));
	};
	
	async post (path, options) {
		this.checkPath(path);
		return this.httpProvider.post(path, this.buildRequest(options));
	};
	
	async put (path, options) {
		this.checkPath(path);
		return this.httpProvider.put(path, this.buildRequest(options));
	};

    async patch (path, options) {
		this.checkPath(path);
		return this.httpProvider.patch(path, this.buildRequest(options));
	};
	
	async delete (path, options) {
		this.checkPath(path);
		return this.httpProvider.delete(path, this.buildRequest(options));
	};
}