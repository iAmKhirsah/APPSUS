import keepApp from './apps/keep/keep-app.js';
import mailApp from './apps/mail/mail-app.js';
import homePage from './pages/app-home.cmp.js';
import { router } from './routes.js';

const options = {
  el: '#app',
  router,
  components: {
    keepApp,
    mailApp,
    homePage,
  },
  template: `
  <section>
    <home-page />
    <!-- <keep-app /> -->
    <router-view />
    <!-- <mail-app /> -->
  </section>
  `,
};

new Vue(options);
