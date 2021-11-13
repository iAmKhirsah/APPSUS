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
    <home-page />
    <router-view />
  </section>
  `,
};

new Vue(options);
