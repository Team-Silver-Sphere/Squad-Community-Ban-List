// Web
const HOST = 'http://localhost';
const LOCALSTORAGE_VERSION = 'v1'; // Change this to wipe clients local storage

const JWT_AUTH = {
  // FOR DEVELOPMENT PURPOSES ONLY!
  ALGORITHM: 'HS256',
  SECRET:
    'Pnc56tlFrlsahFsGt1efxepEZ1xSOBPIcDUZiEhv-UidVDA4Upg7Ao1t8DJFtMo3U-R7hx_rX_okBQBPfthwS428PlQUZmHQgdEMuXb8yktxDhFhzJNzA-hL1mdyJoqhIEUwrL_QtVGrUlrgWpA84fGiGZwubPQYpF1zAD_nHjLkjffxTCidWXJnZNV8IHmju2ZJzKvO6tvbZNrAN6IFWAOtnVYTBiI21vIuC-tpz57x5mS_5XNuiprre0kM4TahVNbc1fhFyvOacaUkbPW82Kj9vgGYzuVBeNnEZYC4zd4UWGJNnLYGKH1yoiHP6QdDgFhqMH4EljZhTvK-NSHOtw'
};

// APIs
const BATTLEMETRICS_API_KEY = process.env.BATTLEMETRICS_API_KEY;
const BATTLEMETRICS_API_RESERVIOR = 10;

const STEAM_API_KEY = process.env.STEAM_API_KEY;

// Other constants
const DISCORD_INVITE = 'https://discord.gg/fbZdj3q';

export {
  HOST,
  BATTLEMETRICS_API_KEY,
  BATTLEMETRICS_API_RESERVIOR,
  STEAM_API_KEY,
  LOCALSTORAGE_VERSION,
  JWT_AUTH,
  DISCORD_INVITE
};
