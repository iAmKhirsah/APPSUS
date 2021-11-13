export default {
  template: `
    <section :class="['filter-container',activeSearch]" tabindex="0" @focusout="clicked = false">
            <span class="magnifying-glass"></span>
            <input v-model="filterBy.title" @mousedown="showFeatures" @input="filter" type="search" placeholder="Search..." :class="['filter-search', activeSearch]">
            <select v-model="filterBy.type" @change="filter">
              <option value="">All</option>
              <option value="note-txt">Txt</option>
              <option value="note-todos">Todos</option>
              <option value="note-img">Img</option>
              <option value="note-vid">Video</option>
            </select>
    </section>`,
  data() {
    return {
      clicked: false,
      filterBy: {
        title: '',
        type: '',
      },
    };
  },
  methods: {
    showFeatures() {
      this.clicked = true;
    },
    closeFeatures() {
      this.clicked = false;
    },
    filter() {
      this.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)));
    },
  },
  computed: {
    activeSearch() {
      return { 'active-search': this.clicked };
    },
  },
};
