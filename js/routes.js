import mailApp from './apps/mail/mail-app.js';
import keepApp from './apps/keep/keep-app.js';
import bookApp from './apps/book/book-app.js';
import homePage from './pages/app-home.cmp.js';
import emailDetails from './apps/mail/email-details-page.cmp.js';
import emailList from './apps/mail/cmps/email-list.cmp.js';
// bookApp
import bookHomePage from './apps/book/js/pages/home-page.cmp.js';
import bookPage from './apps/book/js/pages/book-app.cmp.js';
import bookAboutPage from './apps/book/js/pages/about-page.cmp.js';
import bookDetails from './apps/book/js/pages/book-details.cmp.js';

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
            { path: 'noteToMail', component: emailList },
            { path: ':emailId', component: emailDetails },
        ]
    },
    {
        path: '/keep',
        component: keepApp,
    },
    {
        path: '/book',
        component: bookApp,
        children: [{
                path: '/bookhome',
                component: bookHomePage
            },
            {
                path: '/about',
                component: bookAboutPage
            },
            {
                path: '/book',
                component: bookPage
            },
            {
                path: '/book/:bookId',
                component: bookDetails
            }
        ]
    },
    // {
    //   path: '/keep/:noteId',
    //   component: keepApp,
    // },

];

export const router = new VueRouter({ routes });