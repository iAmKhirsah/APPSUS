import { storageService } from "../../../../services/storage.service.js";
export const mailService = {
    query,
    logThis,
    save,
    getById
}

const EMAILS_KEY = 'emails';
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Muhatma Appsus'
}
_createEmails();

const email = {
    id: 'e' + Date.now() % 1000,
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt: Date.now(),
    to: 'momo@momo.com'
}

function logThis() {
    console.log(email);
}


function query() {
    return storageService.query(EMAILS_KEY)
}

function getById(emailId) {
    return storageService.get(EMAILS_KEY, emailId);
}

function save(email) {
    return storageService.put(EMAILS_KEY, email);
}

function besidePageIdx(currEmailId, direction) {
    return query()
        .then(emails => {
            const idx = emails.findIndex(email => email.id === currEmailId);
            if (direction === -1) {
                if (idx === 0) return emails[emails.length - 1].id;
                return emails[idx - 1].id;
            } else if (direction === 1) {
                if (idx === emails.length - 1) return emails[0].id;
                return emails[idx + 1].id;
            }
        });
}

function _createEmails() {
    let emails = utilService.loadFromStorage(EMAILS_KEY);
    if (!emails || !emails.length) {
        emails = [{
                id: 'e' + Date.now() % 1000,
                subject: 'Incoming mail',
                body: 'Incoming Mail ',
                isRead: false,
                sentAt: Date.now(),
                from: 'momo@momo.com'
            },
            {
                id: 'e' + Date.now() % 1000,
                subject: 'Incoming mail',
                body: 'Incoming Mail ',
                isRead: false,
                sentAt: Date.now(),
                from: 'momo@momo.com'
            },
            {
                id: 'e' + Date.now() % 1000,
                subject: 'Incoming mail',
                body: 'Incoming Mail ',
                isRead: false,
                sentAt: Date.now(),
                from: 'momo@momo.com'
            },
            {
                id: 'e' + Date.now() % 1000,
                subject: 'Incoming mail',
                body: 'Incoming Mail ',
                isRead: false,
                sentAt: Date.now(),
                from: 'momo@momo.com'
            },
            {
                id: 'e' + Date.now() % 1000,
                subject: 'Incoming mail',
                body: 'Incoming Mail ',
                isRead: false,
                sentAt: Date.now(),
                from: 'momo@momo.com'
            },
            {
                id: 'e' + Date.now() % 1000,
                subject: 'Incoming mail',
                body: 'Incoming Mail ',
                isRead: false,
                sentAt: Date.now(),
                from: 'momo@momo.com'
            },
            {
                id: 'e' + Date.now() % 1000,
                subject: 'Incoming mail',
                body: 'Incoming Mail ',
                isRead: false,
                sentAt: Date.now(),
                from: 'momo@momo.com'
            },
            {
                id: 'e' + Date.now() % 1000,
                subject: 'Incoming mail',
                body: 'Incoming Mail ',
                isRead: false,
                sentAt: Date.now(),
                from: 'momo@momo.com'
            },


        ]
        utilService.saveToStorage(EMAILS_KEY, emails);
    }
}