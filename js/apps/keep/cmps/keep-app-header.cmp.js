import keepAppFilter from './keep-app-filter.cmp.js';

export default {
  components: {
    keepAppFilter,
  },
  template: `
   <section class="keep-header">
       <div>Logo(placeholder)</div>
       <div class="search-bar">
        <keep-app-filter @filtered="filtered"/>
       </div>
        <nav>
            <router-link to="/">Home </router-link>
            <router-link to="/mail">Mail </router-link>
        </nav>
   </section>`,
  methods: {
    filtered(filterBy) {
      this.$emit('filtered', filterBy);
    },
  },
};
