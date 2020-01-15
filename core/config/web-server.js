const host = 'http://localhost';
const port = process.env.NODE_ENV === 'production' ? 8080 : 3001; // using port 8080 as in production we use nginx to provide https via proxy

const localStorageVersion = '1';

export { host, port, localStorageVersion };
