import Home from './pages/home';
import Login from './pages/login';

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
    component: Login
  }
];

export default routes;
