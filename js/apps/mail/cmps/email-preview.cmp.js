import { emailService } from "../services/email-service.js";
import { eventBus } from "../../../../services/event-but-service.js";
export default {
    name: 'email-preview',
    props: ['email'],
    template: `
        <section :class="{bold : email.isRead}" class="email-preview">
                <span :class="{starred : email.criteria.starred}" class="star" @click="star"><i class="far fa-star"></i></span>
                <span class="preview-subject">{{subjectPreview}}</span>
                <span class="preview-body">{{bodyPreview}}</span>
                <button @click="markRead">{{markReadButton}}</button>
                <router-link :to="'/mail/' + email.id">Details</router-link>
                <span class="right-icons">
                    <span class="preview-is-read">isRead : {{email.isRead}}</span>    
                    <span class="preview-date">date : {{dateTime}}</span>
                </span>    
        </section>
    `,
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
        subjectPreview() {
            return (this.email.subject.length > 15) ? this.email.subject.slice(0, 15) + '...' : this.email.subject;
        },
        bodyPreview() {
            return (this.email.body.length > 80) ? this.email.body.slice(0, 80) + '...' : this.email.body;
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
        markReadButton() {
            return (this.email.isRead) ? 'Mark Unread' : 'Mark Read';
        },
        starToShow() {
            const starred = '<i class="fas fa-star"></i>';
            const notStarred = '<i class="far fa-star"></i>';
            return (this.email.criteria.starred) ? starred.slice(0, 1).slice(starred.length - 2, starred.length - 1) : notStarred.slice(0, 1).slice(starred.length - 2, starred.length - 1);
        }
    },

}