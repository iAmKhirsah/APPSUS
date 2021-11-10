import { emailService } from "./services/email-service.js";
import emailList from "./cmps/email-list.cmp.js";
import emailFilter from "./cmps/email-filter.cmp.js";
import emailFolderFilter from "./cmps/email-folder-filter.cmp.js";
import composeSort from "./cmps/compose-sort.cmp.js";

export default {
    name: 'email-app',
    template: `
    <section v-if="emails" class="email-app">
        <compose-sort/>
        <email-folder-filter @setCriteria="setCriteria"/>
        <email-filter @filtered="setFilter"/>
        <email-list :emails="emailsToShow"/>
        <span class="unread-count">{{unreadCount}}</span>
    </section>
    <section v-else>Loading</section>
    `,
    data() {
        return {
            emails: null,
            filterBy: { isRead: false, search: '' },
            criteria: 'inbox'
        }
    },
    created() {
        emailService.query(this.criteria)
            .then(emails => this.emails = emails);
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        setCriteria(criteria) {
            this.criteria = criteria;
            emailService.query(this.criteria)
                .then(emails => this.emails = emails);
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
        emailFilter,
        emailFolderFilter,
        composeSort
    }

}