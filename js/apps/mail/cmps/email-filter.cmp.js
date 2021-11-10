export default {
    name: 'email-filter',
    template: `
        <section class="email-filter">
            <label for="read-filter">
                Read
                <input id="read-filter" type="checkbox" v-model="filterBy.read" @change="filter"/>
            </label>
            <label for="search-filter">
                search
                <input id="search-filter" type="text" v-model="filterBy.search" @input="filter"/>
            </label>
        </section>
    `,
    data() {
        return {
            filterBy: {
                read: false,
                search: '',
            }
        }
    },
    methods: {
        filter() {
            this.$emit('filtered', {...this.filterBy });
        }
    }
}