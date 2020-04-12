import Home from './pages/home';
import Login from './pages/login';
import Install from './pages/install';
import Search from './pages/search';
import FAQ from './pages/faq';
import Organizations from './pages/organizations';
import BanLists from './pages/ban-lists';
import QueueMonitor from './pages/queue-monitor';

import Auth from '../../utils/auth';

const routes = [
  {
    path: '/',
    exact: true,
    name: 'Home',
    icon: 'fas fa-home',
    component: Home
  },
  {
    path: '/login',
    exact: true,
    name: 'Login',
    icon: 'fas fa-key',
    component: Login,
    display: () => !Auth.isLoggedIn
  },
  {
    path: '/install',
    exact: true,
    name: 'Install SCBL',
    icon: 'fas fa-file-download',
    component: Install,
    display: () => Auth.isLoggedIn,
    protected: () => Auth.isLoggedIn
  },
  {
    path: '/search/:steamID',
    exact: false,
    name: 'Search',
    icon: 'fa fa-search',
    component: Search,
    display: () => false
  },
  {
    path: '/search',
    exact: true,
    name: 'Search',
    icon: 'fa fa-search',
    component: Search
  },
  {
    path: '/faq',
    exact: true,
    name: 'FAQ',
    icon: 'fas fa-question-circle',
    component: FAQ
  },
  {
    path: '/organizations',
    exact: true,
    name: 'Organizations',
    icon: 'fas fa-users',
    displayInDropdown: true,
    component: Organizations,
    display: () => Auth.isLoggedIn && Auth.claim.systemAdmin,
    protected: () => Auth.isLoggedIn && Auth.claim.systemAdmin
  },
  {
    path: '/ban-lists',
    exact: true,
    name: 'Ban Lists',
    icon: 'fas fa-gavel',
    displayInDropdown: true,
    component: BanLists,
    display: () => Auth.isLoggedIn && Auth.claim.systemAdmin,
    protected: () => Auth.isLoggedIn && Auth.claim.systemAdmin
  },
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
];

export default routes;
