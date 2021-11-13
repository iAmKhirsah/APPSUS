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
    // mounted() {
    //     eventBus.$on('noteToMail', (note) => {
    //         console.log('note', note);
    //         console.log('note-title', note.title);
    //         console.log('note-txt', note.txt);
    //         setTimeout(() => {
    //             this.email.body = 'qwd'
    //             console.log('email', this.email.body);
    //         }, 3000);
    //         this.$nextTick(() => {
    //             this.setBody('asd')
    //         });
    //         // console.log('email', this.email.body);
    //     });


    // },

    methods: {
        setBody(body) {
            this.email.body = body;
        },
        save(status) {
            if (!this.email.subject && !this.email.to && !this.email.body) {
                this.isSaveDraft = true;
                setTimeout(() => {
                    this.isSaveDraft = false;
                }, 2000);
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
    },
    watch: {
        incomingNote(newVal, oldVal) {

            if (newVal) {
                console.log(newVal)
                this.setBody(newVal);
            }
        }
    },
}