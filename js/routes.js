import mailApp from './apps/mail.js';
import keepApp from './apps/keep.js';
import homePage from './pages/app-about-cmp.js';

const routes = [
  {
    path: '/',
    component: homePage,
  },
  {
    path: '/mail',
    component: mailApp,
  },
  {
    path: '/keep',
    component: keepApp,
  },
];

export const router = new VueRouter({ routes });
