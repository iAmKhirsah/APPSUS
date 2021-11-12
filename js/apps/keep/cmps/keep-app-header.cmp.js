import keepAppFilter from './keep-app-filter.cmp.js';

export default {
  components: {
    keepAppFilter,
  },
  template: `
   <section class="keep-header" @blur="isClicked = false">
       <div class="search-bar" @click="clicked" :class="activeSearch">
        <keep-app-filter @filtered="filtered"/>
       </div>
   </section>`,
  data() {
    return {
      isClicked: false,
    };
  },
  methods: {
    clicked(){
      this.isClicked = true
    },
    filtered(filterBy) {
      this.$emit('filtered', filterBy);
    },
  },
  computed: {
    activeSearch() {
      return this.isClicked ? 'active-search' : '';
    },
  },
};
