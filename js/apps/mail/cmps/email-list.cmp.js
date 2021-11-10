import emailPreview from "./email-preview.cmp.js"
export default {
    name: 'email-list',
    props: ['emails'],
    template: `
        <!-- {{emails}} -->
        <ul class="email-list">
            <li v-for="email in emails" :key="email.id">
                <email-preview :email="email"/>
            </li>
        </ul>
        
    `,
    data() {
        return {
            // emails: null
        }
    },
    created() {
        // emailService.query()
        //     .then(emails => console.log(emails));
    },
    components: {
        emailPreview
    }

}