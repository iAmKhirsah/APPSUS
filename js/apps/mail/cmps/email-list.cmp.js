export default {
    name: 'email-list',
    props: ['emails'],
    template: `
        <!-- {{emails}} -->
        <ul class="email-list">
            <li v-for="email in emails" :key="email.id">
                {{email.subject}}
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
    }

}