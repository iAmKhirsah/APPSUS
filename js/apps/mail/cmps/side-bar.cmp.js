import { eventBus } from "../../../../services/event-bus-service.js";

export default {
    name: 'side-bar',
    props: ['burgerMenu'],
    template: `
        <section v-if="!burgerMenu || isOpen" class="side-bar">
            <button class="compose-btn" @click="compose">
                <img src="https://www.gstatic.com/images/icons/material/colored_icons/1x/create_32dp.png"/>
                Compose
            </button>
            <section class="folder-list">
                <button @click="setCriteria('inbox')"><i class="fas fa-inbox"></i>  Inbox</button>
                <button @click="setStarred()"><i class="fas fa-star"></i>  Starred</button>
                <button @click="setCriteria('draft')"><i class="fas fa-sticky-note"></i>  Drafts</button>
                <button @click="setCriteria('sent')"><i class="far fa-paper-plane"></i>  Sent</button>
                <button @click="setCriteria('trash')"><i class="fas fa-trash"></i>  Trash</button>
            </section>
        </section>
    `,
    data() {
        return {
            isOpen: false
        }
    },
    created() {
        eventBus.$on('toggleBar', () => {
            this.isOpen = !this.isOpen
        });
    },
    methods: {
        setCriteria(status) {
            if (!this.$route.path.includes(status)) this.$router.push({ path: status });
            this.$emit('setCriteria', { status, starred: false });
            this.isOpen = !this.isOpen;
        },
        setStarred() {
            if (!this.$route.path.includes('starred')) this.$router.push({ path: 'starred' });
            this.$emit('setCriteria', { status: '', starred: true });
            this.isOpen = !this.isOpen;
        },
        compose() {
            this.$emit('compose');
        }
    },
    watch: {}

}