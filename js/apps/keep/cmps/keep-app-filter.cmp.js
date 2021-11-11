export default {
  template: `
    <section @click="showFeatures" @blur="closeFeatures">
            <span class="magnifying-glass"></span>
            <input @input="filter" v-model="filterBy.title" type="search" placeholder="Search...">
            <select @input="filter" v-if="clicked" v-model="filterBy.type" class="type-select">
            <option value="note-txt">Txt</option>
            <option value="note-todos">Todos</option>
            <option value="note-img">Img</option>
            <option value="note-vid">Video</option>
    </select>
    <span v-if="clicked" class="clear-search" @click="clearSearch">X</span>
    </section>`,
  data() {
    return {
      clicked: false,
      filterBy: {
        title: '',
        type: 'note-txt',
      },
    };
  },
  methods: {
    clearSearch() {
      this.filterBy.title = '';
      this.filterBy.type = '';
    },
    showFeatures() {
      this.clicked = true;
    },
    closeFeatures() {
      this.clicked = false;
    },
    filter() {
      console.log(this.filterBy.type);
      this.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)));
      this.filterBy.type = '';
    },
  },
};
