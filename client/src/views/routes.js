import Home from './pages/home.js';

import Login from './pages/login.js';

import Search from './pages/search.js';
import RecentBans from './pages/recent-bans.js';
import MostHarmfulPlayers from './pages/most-harmful-players.js';
import MostHarmfulPlayersThisMonth from './pages/most-harmful-players-this-month.js';
import Insights from './pages/insights.js';

import EditExportBanList from './pages/create-export-ban-list.js';
import ExportBanLists from './pages/export-ban-lists.js';
import CommunityMonitor from './pages/community-monitor.js';

import BecomeAPartnerOrganisation from './pages/become-a-partner-organisation.js';

import FAQ from './pages/faq.js';
import PartnerOrganisationList from './pages/partner-organisation-list.js';

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
    path: '/most-harmful-players-this-month',
    exact: true,
    login: false,
    component: MostHarmfulPlayersThisMonth
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
    path: '/community-monitor',
    exact: true,
    login: false,
    component: CommunityMonitor
  },

  {
    path: '/become-a-partner-organisation',
    exact: true,
    login: false,
    component: BecomeAPartnerOrganisation
  },

  {
    path: '/faq',
    exact: false,
    login: false,
    component: FAQ
  },

  {
    path: '/partner-organisation-list',
    exact: true,
    login: false,
    component: PartnerOrganisationList
  }
];

export default routes;
