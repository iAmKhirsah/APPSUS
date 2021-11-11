import { emailService } from "../services/email-service.js";

export default {
    name: 'email-compose',
    template: `
        <section class="compose-email">
            <form @submit.prevent="save('sent')">
                <input type="email" v-model="email.to" placeholder="To" required/>
                <input type="text" v-model="email.subject" placeholder="Subject" required/>
                <textarea cols="30" rows="10" v-model="email.body" placeholder="Compose email" required></textarea>
                <button>send</button>
            </form>
            <button @click="save('draft')">draft</button>
            <button @click="close">X</button>
        </section>
    `,
    data() {
        return {
            email: {
                to: '',
                subject: '',
                body: ''
            }
        }
    },
    methods: {
        save(status) {
            emailService.save(emailService.createEmail(this.email.subject,
                this.email.body,
                false,
                this.email.to, { status, starred: false }
            ));
            this.$emit('compose');
        },
        close() {
            this.$emit('compose');
        }
    }
}