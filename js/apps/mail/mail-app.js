import { emailService } from "./services/email-service.js";
import emailList from "./cmps/email-list.cmp.js";
export default {
    name: 'email-app',
    template: `
    <section class="email-app">
        <!-- <email-filter @filtered="setFilter"/> -->
        <email-list :emails="emailsToShow"/>
    </section>
    `,
    data() {
        return {
            emails: null,
            filterBy: null
        }
    },
    created() {
        emailService.query()
            .then(emails => this.emails = emails);
    },
    methods: {
        // setFilter(filterBy) {
        //     this.filterBy = filterBy;
        // }
    },
    computed: {
        emailsToShow() {
            return this.emails;
        }
    },
    components: {
        emailList
    }

}