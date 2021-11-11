import emailPreview from "./email-preview.cmp.js"
export default {
    name: 'email-list',
    props: ['emails'],
    template: `
        <ul class="email-list">
            <li v-for="email in emails" :key="email.id">
                <email-preview :email="email"/>
            </li>
        </ul>
        
    `,
    created() {
        console.log('true', true);
    },
    data() {
        return {}
    },
    created() {},
    components: {
        emailPreview
    }

}