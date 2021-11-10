import { emailService } from "./services/email-service.js";
import emailList from "./cmps/email-list.cmp.js";
import emailFilter from "./cmps/email-filter.cmp.js";
export default {
    name: 'email-app',
    template: `
    <section v-if="emails" class="email-app">
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
            currCriteria: 'inbox'
        }
    },
    created() {
        emailService.query()
            .then(emails => this.emails = emailService.filterByCriteria(emails, this.currCriteria));
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy;
        }
    },
    computed: {
        emailsToShow() {
            if (!this.filterBy) return this.emails;
            const searchStr = this.filterBy.search.toLowerCase();
            console.log('filterBy', this.filterBy.read);
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
        emailFilter
    }

}