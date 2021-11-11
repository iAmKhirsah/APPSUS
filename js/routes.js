import mailApp from './apps/mail/mail-app.js';
import keepApp from './apps/keep/keep-app.js';
import homePage from './pages/app-about-cmp.js';
import emailDetails from './apps/mail/email-details-page.cmp.js';
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
  // {
  //   path: '/keep/:noteId',
  //   component: keepApp,
  // },
  {
    path: '/mail/:emailId',
    component: emailDetails,
  },
];

export const router = new VueRouter({ routes });
