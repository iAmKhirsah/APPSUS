import { emailService } from "./services/email-service.js";
import { eventBus } from "../../../services/event-but-service.js";
export default {
    name: 'email-details',
    template: `
    <section v-if="email"class="email-details">
    <h1>{{email.from}}</h1>
    <h1>{{email.subject}}</h1>
    <p>{{email.body}}</p>
    <div>{{email.sentAt}}</div>
    <router-link to="/mail"><button @click="deleteEmail">delete</button></router-link>
    <router-link to="/mail">Back</router-link>
    <button @click="saveNote">Save as note</button>
    </section>
    `,
    data() {
        return {
            email: null
        }
    },
    created() {
        const emailId = this.$route.params.emailId;
        emailService.getById(emailId)
            .then((email) => {
                this.email = email
                this.email.isRead = true;
                emailService.save(this.email);
            });
    },
    methods: {
        deleteEmail() {
            emailService.remove(this.email.id);
        },
        saveNote() {
            eventBus.$emit('emailToNote', {
                from: this.email.from,
                subject: this.email.subject,
                body: this.email.body
            });
        }
    }
}