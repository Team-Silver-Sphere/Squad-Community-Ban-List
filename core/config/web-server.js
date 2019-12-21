const host = 'http://localhost';
const port = process.env.NODE_ENV === 'production' ? 80: 3001;

export { host, port };
