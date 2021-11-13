import { eventBus } from "../../../../services/event-bus-service.js";
import { emailService } from "../services/email-service.js";
export default {
    name: 'email-compose',
    props: ['incomingNote'],
    template: `
        <section class="compose-email">
            <form @submit.prevent="save('sent')">
                <h1>Compose new mail : </h1>
                <input type="email" v-model="email.to" placeholder="To" required autofocus/>
                <input type="text" v-model="email.subject" placeholder="Subject" required/>
                <textarea cols="30" rows="10" v-model="email.body" placeholder="Compose email" required></textarea>
                <button>Send</button>
            </form>
            <h5 v-if="isSaveDraft">Can't save empty draft</h5>
            <div class="compose-email-buttons">
                <button @click="save('draft')">Draft</button>
                <button @click="close">Remove</button>
            </div>            
        </section>
    `,
    data() {
        return {
            email: {
                to: '',
                subject: '',
                body: ''
            },
            isSaveDraft: false
        }
    },
    mounted() {
        if (this.incomingNote) {
            if (this.incomingNote.info.title) this.email.subject = this.incomingNote.info.title;
            if (this.incomingNote.info.txt) this.email.body = this.incomingNote.info.txt;
        }
    },

    methods: {
        save(status) {
            if (!this.email.subject && !this.email.to && !this.email.body) {
                this.isSaveDraft = true;
                setTimeout(() => {
                    this.isSaveDraft = false;
                }, 2000);
                // this.$emit('resetIncomingNote');
                return;
            }
            emailService.saveNew(emailService.createEmail(this.email.subject,
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