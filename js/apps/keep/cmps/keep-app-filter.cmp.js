export default {
  template: `
    <section @click="showFeatures" @blur="closeFeatures">
            <span class="magnifying-glass"></span>
            <input v-model="filterBy.title"  @input="filter" type="search" placeholder="Search...">
            <select v-model="filterBy.type" v-if="clicked" @change="filter" class="type-select">
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
};
