class TokenService {
  constructor(lsKey) {
    this.cbs = [];
    this.lsKey = lsKey;
  }

  hasToken() {
    return !!this.getToken();
  }

  setToken(token) {
    if (!token) {
      this.removeToken();
    }
  }


  getToken() {
    return localStorage.getItem(this.lsKey) || null;
  }


  removeToken() {
    localStorage.removeItem(this.lsKey);
  }

  fireChangeEvent(token) {
    this.cbs.forEach(cb => cb(!!token));
  }

  subscribe(cb) {
    this.cbs.push(cb);
  }


  setTokens(token) {
    localStorage.setItem(this.lsKey, token);
  }
}

export default new TokenService('book-shop');
