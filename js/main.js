import keepApp from './apps/keep/keep-app.js';
import mailApp from './apps/mail/mail-app.js';
import homePage from './pages/app-home.cmp.js';
import appHeader from './cmps/app-header.cmp.js';
import { router } from './routes.js';

const options = {
    el: '#app',
    router,
    components: {
        homePage,
        appHeader,
    },
    template: `
  <section>
    <app-header />
    <router-view />
  </section>
  `,
};

new Vue(options);