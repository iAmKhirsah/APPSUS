import bookApp from './js/pages/book-app.cmp.js';
import appHeader from './js/cmps/app-header.cmp.js';
import userMsg from './js/cmps/user-msg.cmp.js'
export default {
    template: `
    <section>
        <user-msg/>
        <app-header></app-header> 
        <router-view/>
    </section>
    `,

    components: {
        bookApp,
        appHeader,
        userMsg
    }
};