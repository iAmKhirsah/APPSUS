import emailPreview from "./email-preview.cmp.js"
export default {
    name: 'email-list',
    props: ['emails'],
    template: `
        <ul class="email-list">
            <li v-for="email in emails" :key="email.id">
                <router-link :to="'/mail/' + email.id"><email-preview :email="email"/></router-link>
            </li>
        </ul>
        
    `,
    created() {},
    components: {
        emailPreview
    }

}