import mailApp from './apps/mail/mail-app.js';
import keepApp from './apps/keep/keep-app.js';
import homePage from './pages/app-about-cmp.js';
import emailDetails from './apps/mail/email-details-page.cmp.js';
import emailList from './apps/mail/cmps/email-list.cmp.js';

const routes = [{
        path: '/',
        component: homePage,
    },
    {
        path: '/mail/',
        component: mailApp,
        children: [
            { path: 'inbox', component: emailList },
            { path: 'starred', component: emailList },
            { path: 'draft', component: emailList },
            { path: 'sent', component: emailList },
            { path: 'trash', component: emailList },
            { path: ':emailId', component: emailDetails },
        ]
    },
    {
        path: '/keep',
        component: keepApp,
    },
    // {
    //   path: '/keep/:noteId',
    //   component: keepApp,
    // },

];

export const router = new VueRouter({ routes });