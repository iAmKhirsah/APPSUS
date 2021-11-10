export default {
    name: 'email-folder-list',
    template: `
        <section class="folder-list">
            <button @click="filter('inbox')">inbox</button>
            <button @click="filter('sent')">sent</button>
            <button @click="filter('trash')">trash</button>
            <button @click="filter('drafts')">drafts</button>
        </section>
    `,
    data() {
        return {
            criteria: null
        }
    },
    methods: {
        filter(criteria) {
            this.criteria = criteria;
            this.$emit('folderFiltered', { criteria });
        }
    }

}