const host = 'http://localhost';
const port = process.env.NODE_ENV === 'production' ? 8080 : 3001; // using port 8080 as in production we use nginx to provide https via proxy

const localStorageVersion = '1';

const googleAnalyticsID = 'UA-89614544-2';
const discordLink = 'https://discord.gg/fbZdj3q';

export { host, port, localStorageVersion, discordLink, googleAnalyticsID };
