import { emailService } from "./services/email-service.js";
import emailList from "./cmps/email-list.cmp.js";
import topBar from "./cmps/top-bar.cmp.js";
import sideBar from "./cmps/side-bar.cmp.js";
import emailCompose from "./cmps/email-compose.cmp.js";
import { eventBus } from "../../../services/event-bus-service.js";
export default {
    name: 'email-app',
    template: `
        <section v-if="emails" class="email-app">
            <top-bar :emails="emailsToShow" @setCriteria="setCriteria" @filtered="setFilter" @sortBy="sortBy" @compose="isCompose = !isCompose"/>
            <side-bar @setCriteria="setCriteria" @compose="isCompose = !isCompose"/>
            <email-list v-if="!this.$route.params.emailId" :emails="emailsToShow"/>
            <router-view v-else class="email-list"></router-view>
            <div v-if="isCompose" class="compose-background" @click="isCompose = !isCompose"></div>
            <email-compose v-if="isCompose" @compose="isCompose = !isCompose"/>
        </section>
        <section v-else>Loading</section>
    `,
    data() {
        return {
            emails: null,
            filterBy: { isRead: false, search: '' },
            criteria: { status: 'inbox', starred: false },
            isCompose: false,
            testing: false
        }
    },
    created() {
        eventBus.$on('starChange', () => {
            if (this.criteria.starred) emailService.query(this.criteria).then(emails => this.emails = emails);
        });
        eventBus.$on('emailRemoves', () => emailService.query(this.criteria)
            .then(emails => this.emails = emails));

        eventBus.$on('noteToMail', (note) => {
            this.$nextTick(() => {
                this.changeCompose();
            })

        });

        emailService.query(this.criteria)
            .then(emails => this.emails = emails);
    },
    watch: {

    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        setCriteria(criteria) {
            this.criteria = criteria;
            emailService.query(this.criteria)
                .then(emails => {
                    this.emails = emails;
                });
        },
        sortBy(sortBy) {
            this.emails = emailService.sortBy(this.emails, sortBy);
        }
    },
    computed: {
        emailsToShow() {
            if (!this.filterBy) return this.emails;
            const searchStr = this.filterBy.search.toLowerCase();
            return this.emails.filter(email => {
                if (this.filterBy.read) return email.isRead && (email.subject.toLowerCase().includes(searchStr) || email.body.toLowerCase().includes(searchStr))
                else return (email.subject.toLowerCase().includes(searchStr) || email.body.toLowerCase().includes(searchStr))
            });
        },
        unreadCount() {
            return this.emails.filter(email => !email.isRead).length
        }
    },
    components: {
        emailList,
        topBar,
        sideBar,
        emailCompose,
    }

}