import { storageService } from "../../../../services/async-storage-service.js";
import { utilService } from "../../../../services/util.service.js";
export const emailService = {
    query,
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

function query() {
    return storageService.query(EMAILS_KEY)
}

function getById(emailId) {
    return storageService.get(EMAILS_KEY, emailId);
}

function save(email) {
    return storageService.put(EMAILS_KEY, email);
}

function _createEmails() {
    let emails = utilService.loadFromStorage(EMAILS_KEY);
    if (!emails || !emails.length) {
        emails = [
            createEmail(),
            createEmail(),
            createEmail(),
            createEmail(),
            createEmail(),
            createEmail(),
            createEmail(),
            createEmail(),
        ]
        utilService.saveToStorage(EMAILS_KEY, emails);
    }
}

function createEmail(subject = 'Incoming mail', body = 'Mail body', isRead = false, from = 'Anonymouse@mail.com') {
    return {
        id: utilService.makeId(),
        subject,
        body,
        isRead,
        sentAt: Date.now(),
        from
    }
}