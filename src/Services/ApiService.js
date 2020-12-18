import qs from 'qs';
import TokenService from './TokenService';

const CONTENT_TYPE_JSON = 'application/json';

export function prepareQueryString(params) {
  const updParams = Object.keys(params)
    .filter(key => params[key] !== null)
    .reduce((acc, cur) => ({ ...acc, [cur]: params[cur] }), {});

  return qs.stringify(updParams, { encode: false, arrayFormat: 'brackets' });
}

export function parseQueryString(queryString) {
  return qs.parse(queryString, { ignoreQueryPrefix: true });
}

const API_PREFIX = process.env.REACT_APP_API_PREFIX || '/api';

class ApiService {
  constructor(apiPrefix, ts) {
    this.apiPrefix = apiPrefix;
    this.ts = ts;
  }

  getApiLink(link, params) {
    return this.apiPrefix + link + (params ? '?' + prepareQueryString(params) : '');
  }

  async call(url, method = 'GET', options = {}, params = null) {
    const headers = options.headers || {};
    headers['X-Requested-With'] = 'XMLHttpRequest';

    if (this.ts.hasToken()) {
      headers['Authorization'] = this.ts.getToken();
    }

    for (let headerKey in (options.headers || {})) {
      if (options.headers.hasOwnProperty(headerKey)) {
        headers[headerKey] = options.headers[headerKey];
      }
    }

    options.headers = headers;
    options.method = method;
    options.credentials = 'include';
    options.mode = 'cors';

    return fetch(this.getApiLink(url, params), options)
      .then(resp => {
        let result;
        const contentType = resp.headers.get('Content-Type');

        if (contentType && contentType.includes(CONTENT_TYPE_JSON)) {
          result = resp.json();
        } else {
          result = resp.text();
        }

        return Promise.all([result, resp.status]);
      })
      .then(([data, status]) => {
        if (status === 401) {
          this.ts.removeToken();
        }

        if (status >= 500 || [400, 401, 402, 403, 404].includes(status)) {
          return Promise.reject(data.error || data);
        }

        if (data.error) {
          return Promise.reject(data.error);
        }

        return (typeof data.data === 'undefined') ? data : data.data;
      });
  }

  async get(url, params = null, options = {}) {
    return this.call(url, 'GET', options, params);
  }

  async post(url, data = null, options = {}) {

    if (data) {
      options.body = JSON.stringify(data);
      options.headers = {
        'Content-Type': CONTENT_TYPE_JSON,
      };
    }

    return this.call(url, 'POST', options);
  }

  async put(url, data = null, options = {}) {

    if (data) {
      options.body = JSON.stringify(data);
      options.headers = {
        'Content-Type': CONTENT_TYPE_JSON,
      };
    }

    return this.call(url, 'PUT', options);
  }

  async upload(url, file, name) {

    const formData = new FormData();
    formData.append(name, file);

    const options = {
      body: formData,
    };

    return this.call(url, 'POST', options);
  }

  async delete(url) {

    return this.call(url, 'DELETE');
  }
}

export default new ApiService(API_PREFIX, TokenService);
