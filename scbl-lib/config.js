// Web
const HOST = process.env.HOST || 'http://localhost';
const PORT = process.env.PORT || 80;

const LOCALSTORAGE_VERSION = 'v1'; // Change this to wipe clients local storage

// Auth
const JWT_AUTH = {
  // REPLACE KEY IN PRODUCTION!
  ALGORITHM: process.env.JWT_AUTH_ALGORITHM || 'HS256',
  SECRET:
    process.env.JWT_AUTH_SECRET ||
    'Pnc56tlFrlsahFsGt1efxepEZ1xSOBPIcDUZiEhv-UidVDA4Upg7Ao1t8DJFtMo3U-R7hx_rX_okBQBPfthwS428PlQUZmHQgdEMuXb8yktxDhFhzJNzA-hL1mdyJoqhIEUwrL_QtVGrUlrgWpA84fGiGZwubPQYpF1zAD_nHjLkjffxTCidWXJnZNV8IHmju2ZJzKvO6tvbZNrAN6IFWAOtnVYTBiI21vIuC-tpz57x5mS_5XNuiprre0kM4TahVNbc1fhFyvOacaUkbPW82Kj9vgGYzuVBeNnEZYC4zd4UWGJNnLYGKH1yoiHP6QdDgFhqMH4EljZhTvK-NSHOtw'
};

// APIs
const BATTLEMETRICS_API_KEY = process.env.BATTLEMETRICS_API_KEY;
const BATTLEMETRICS_ORGANIZATION = '14987';
const BATTLEMETRICS_API_RESERVIOR = process.env.BATTLEMETRICS_API_RESERVIOR || 10;

const STEAM_API_KEY = process.env.STEAM_API_KEY;

// Other constants
const DISCORD_INVITE = 'https://discord.gg/DjrpPuw';

export {
  HOST,
  PORT,
  BATTLEMETRICS_API_KEY,
  BATTLEMETRICS_API_RESERVIOR,
  BATTLEMETRICS_ORGANIZATION,
  STEAM_API_KEY,
  LOCALSTORAGE_VERSION,
  JWT_AUTH,
  DISCORD_INVITE
};
