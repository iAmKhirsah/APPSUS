import { emailService } from "../services/email-service.js";
import { eventBus } from "../../../../services/event-but-service.js";
export default {
    name: 'email-preview',
    props: ['email'],
    template: `
        <section :class="{bold : !email.isRead}" class="email-preview">
                <span :class="{starred : email.criteria.starred}" class="star" @click.prevent="star" v-html="starToShow"></span>
                <span class="preview-to">{{toPreview}}</span>
                <span class="preview-subject">{{subjectPreview}}</span>
                <span class="preview-body">{{bodyPreview}}</span>
                <span @click.prevent="markRead" v-html="markAsReadShow"></span>
                <span class="preview-date">{{dateTime}}</span>
        </section>
    `,
    data() {
        return {}
    },
    methods: {
        markRead() {
            this.email.isRead = !this.email.isRead;
            emailService.save(this.email);
        },
        star(ev) {
            this.email.criteria.starred = !this.email.criteria.starred;
            emailService.save(this.email)
                .then(() => {
                    if (!this.email.criteria.starred) eventBus.$emit('starChange');
                });
        }
    },
    computed: {
        toPreview() {
            return (this.email.from.length > 20) ? this.email.from.slice(0, 20) + '...' : this.email.from;
        },
        subjectPreview() {
            return (this.email.subject.length > 10) ? this.email.subject.slice(0, 10) + '...' : this.email.subject;
        },
        bodyPreview() {
            return (this.email.body.length > 50) ? this.email.body.slice(0, 50) + '...' : this.email.body;
        },
        dateTime() {
            const today = new Date();
            const sentAt = new Date(this.email.sentAt);
            if (today.getDate() === sentAt.getDate() &&
                today.getMonth() === sentAt.getMonth() &&
                today.getFullYear() === sentAt.getFullYear()) {
                return sentAt.toLocaleTimeString()
            }
            return sentAt.toLocaleDateString() + " " + sentAt.toLocaleTimeString()
        },
        markAsReadShow() {
            return (this.email.isRead) ? '<i class="fas fa-envelope"></i>' : '<i class="fas fa-envelope-open-text"></i>';
        },
        starToShow() {
            const starred = '<i class="fas fa-star"></i>';
            const notStarred = '<i class="far fa-star"></i>';
            return (this.email.criteria.starred) ? starred : notStarred;
        }

    },

}