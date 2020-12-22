import Home from './pages/home.js';

import Login from './pages/login.js';

import Search from './pages/search.js';
import RecentBans from './pages/recent-bans.js';
import MostHarmfulPlayers from './pages/most-harmful-players.js';
import Insights from './pages/insights.js';

import EditExportBanList from './pages/create-export-ban-list.js';
import ExportBanLists from './pages/export-ban-lists.js';
import DiscordAlerts from './pages/discord-alerts.js';

import BecomeAPartnerOrganisation from './pages/become-a-partner-organisation.js';

// import Auth from '../utils/auth.js';

const routes = [
  {
    path: '/',
    exact: true,
    login: false,
    component: Home
  },

  {
    path: '/login',
    exact: true,
    login: false,
    component: Login
  },

  {
    path: '/search/:search',
    exact: false,
    login: false,
    component: Search
  },
  {
    path: '/search',
    exact: true,
    login: false,
    component: Search
  },
  {
    path: '/recent-bans',
    exact: true,
    login: false,
    component: RecentBans
  },
  {
    path: '/most-harmful-players',
    exact: true,
    login: false,
    component: MostHarmfulPlayers
  },
  {
    path: '/insights',
    exact: true,
    login: false,
    component: Insights
  },

  {
    path: '/export-ban-lists/:id',
    exact: false,
    login: true,
    component: EditExportBanList
  },
  {
    path: '/export-ban-lists',
    exact: true,
    login: true,
    component: ExportBanLists
  },
  {
    path: '/discord-alerts',
    exact: true,
    login: false,
    component: DiscordAlerts
  },

  {
    path: '/become-a-partner-organisation',
    exact: true,
    login: false,
    component: BecomeAPartnerOrganisation
  }
];

export default routes;
