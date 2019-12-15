import axios from 'axios';

import auth from './auth';

class HTTPClient {
  constructor() {
    this.axios = axios.create();
  }

  get = uri =>
    this.axios.get(uri, { headers: { Authorization: 'JWT ' + auth.jwtToken } });
}

export default new HTTPClient();
