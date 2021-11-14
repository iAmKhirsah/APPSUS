import { eventBus } from '../services/event-bus-service.js';
export default {
    template: `
    <div v-if="msg" class="user-msg" :class="msg.type">
        <p>{{msg.txt}}</p>
        <button @click="msg = null">x</button>
        <router-link v-if="msg.link" :to="msg.link">Check it out</router-link>
    </div>
    `,
    data() {
        return {
            msg: null
        }
    },
    created() {
        eventBus.$on('showMsg', this.showMsg);
    },
    methods: {
        showMsg(msg) {
            this.msg = msg;
            setTimeout(() => {
                this.msg = null;
            }, 3000);
        }
    }
}