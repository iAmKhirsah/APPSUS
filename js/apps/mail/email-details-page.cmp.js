import { emailService } from "./services/email-service.js";
import { eventBus } from "../../../services/event-but-service.js";
export default {
    name: 'email-details',
    template: `
    <section v-if="email" class="email-details">
        <span><b>Composed</b> : {{email.from}}</span>
        <span><b>Subject :</b> {{email.subject}}</span>
        <p> {{email.body}}</p>
        <span><b>Sent At :</b> {{dateTime}}</span>
        <div class='detail-buttons'>
            <router-link to="/mail" @click.native="deleteEmail">delete</router-link>
            <router-link to="/mail">Back</router-link>
            <button @click="saveNote">Save as note</button>
        </div>
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
    computed: {
        dateTime() {
            const today = new Date();
            const sentAt = new Date(this.email.sentAt);
            if (today.getDate() === sentAt.getDate() &&
                today.getMonth() === sentAt.getMonth() &&
                today.getFullYear() === sentAt.getFullYear()) {
                return sentAt.toLocaleTimeString()
            }
            return sentAt.toLocaleDateString() + " " + sentAt.toLocaleTimeString()
        }
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