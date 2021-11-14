export default {
    template: `
        <div class="book-filter">
            <label>Search</label>
            <input @input="filter" v-model="filterBy.title" type="text" placeholder="Book title">
            <input @input="filter" v-model="filterBy.fromPrice" type="number" placeholder="From price">
            <input @input="filter" v-model="filterBy.toPrice" type="number" placeholder="To price">
        </div>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                fromPrice: 0,
                toPrice: Infinity,
            }
        };
    },
    methods: {
        filter() {
            this.$emit('filtered', {...this.filterBy, });
        }
    }
}