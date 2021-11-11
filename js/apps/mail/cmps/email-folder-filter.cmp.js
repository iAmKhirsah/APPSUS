export default {
    name: 'email-folder-list',
    template: `
        <section class="folder-list">
            <button @click="setCriteria('inbox')">inbox</button>
            <button @click="setCriteria('sent')">sent</button>
            <button @click="setCriteria('trash')">trash</button>
            <button @click="setCriteria('draft')">drafts</button>
            <button @click="setStarred()">starred</button>
        </section>
    `,
    methods: {
        setCriteria(status) {
            this.$emit('setCriteria', { status, starred: false });
        },
        setStarred() {
            this.$emit('setCriteria', { status: '', starred: true });
        }

    }

}