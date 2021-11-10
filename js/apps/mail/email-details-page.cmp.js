import { emailService } from "./services/email-service.js";

export default {
    name: 'email-details',
    template: `
    <section v-if="email"class="email-details">
        <h1>{{email}}</h1>
        <router-link to="/mail"><button @click="deleteEmail">delete</button></router-link>
        <router-link to="/mail">Back</router-link>
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
            .then((email) => this.email = email);
    },
    methods: {
        deleteEmail() {
            console.log(this.email.id)
            emailService.remove(this.email.id);
            console.log(this.email.id)
                // emailService.query()
                //     .then(emails => console.log(emails))
        }
    }
}