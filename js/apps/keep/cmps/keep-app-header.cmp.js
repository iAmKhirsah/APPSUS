import keepAppFilter from './keep-app-filter.cmp.js';

export default {
  components: {
    keepAppFilter,
  },
  template: `
   <section class="keep-header">
       <div class="search-bar">
        <keep-app-filter @filtered="filtered"/>
       </div>
   </section>`,
  data() {
    return {
    };
  },
  methods: {
    filtered(filterBy) {
      this.$emit('filtered', filterBy);
    },
  },
  computed: {
  },
};
