import longText from "./long-text.cmp.js"
export default {
    name: 'email-preview',
    props: ['email'],
    template: `
        <section class="email-preview">
                <span class='preview-subject'>{{subjectPreview}}</span>
                <span class='preview-body'>{{bodyPreview}}</span>
                <span class="preview-is-read">isRead : {{email.isRead}}</span>    
        </section>
    `,
    computed: {
        subjectPreview() {
            return (this.email.subject.length > 15) ? this.email.subject.slice(0, 15) + '...' : this.email.subject;
        },
        bodyPreview() {
            return (this.email.body.length > 80) ? this.email.body.slice(0, 80) + '...' : this.email.body;
        }
    },
    components: {
        longText
    }
}