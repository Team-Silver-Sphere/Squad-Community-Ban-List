import Home from './pages/home.js';

import Login from './pages/login.js';

import Search from './pages/search.js';
import RecentBans from './pages/recent-bans.js';
import MostHarmfulPlayers from './pages/most-harmful-players.js';
import Insights from './pages/insights.js';

import ExportBanLists from './pages/export-ban-lists.js';
import DiscordAlerts from './pages/discord-alerts.js';

import BecomeAPartnerOrganisation from './pages/become-a-partner-organisation.js';

// import Auth from '../utils/auth.js';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },

  {
    path: '/login',
    exact: true,
    component: Login
  },

  {
    path: '/search/:search',
    exact: false,
    component: Search
  },
  {
    path: '/search',
    exact: true,
    component: Search
  },
  {
    path: '/recent-bans',
    exact: true,
    component: RecentBans
  },
  {
    path: '/most-harmful-players',
    exact: true,
    component: MostHarmfulPlayers
  },
  {
    path: '/insights',
    exact: true,
    component: Insights
  },

  {
    path: '/export-ban-lists',
    exact: true,
    component: ExportBanLists
  },
  {
    path: '/discord-alerts',
    exact: true,
    component: DiscordAlerts
  },

  {
    path: '/become-a-partner-organisation',
    exact: true,
    component: BecomeAPartnerOrganisation
  }

  /*
  {
    path: '/queue-monitor',
    exact: true,
    name: 'Queue Monitor',
    icon: 'fas fa-desktop',
    displayInDropdown: true,
    component: QueueMonitor,
    display: () => Auth.isLoggedIn && Auth.claim.systemAdmin,
    protected: () => Auth.isLoggedIn && Auth.claim.systemAdmin
  }
   */
];

export default routes;
