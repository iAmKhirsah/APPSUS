import { asyncStorageService } from "../../../../services/async-storage-service.js";
import { storageService } from "../../../../services/storage.service.js";
import { utilService } from "../../../../services/util.service.js";

export const emailService = {
    query,
    save,
    getById,
    remove
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
    return asyncStorageService.query(EMAILS_KEY)
}

function getById(emailId) {
    return asyncStorageService.get(EMAILS_KEY, emailId);
}

function save(email) {
    return asyncStorageService.put(EMAILS_KEY, email);
}

function remove(emailId) {
    asyncStorageService.remove(EMAILS_KEY, emailId);
}

function _createEmails() {
    let emails = storageService.loadFromStorage(EMAILS_KEY);
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
        storageService.saveToStorage(EMAILS_KEY, emails);
    }
}

function createEmail(subject = 'Incoming mail', body = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sollicitudin quam.', isRead = false, from = 'Anonymouse@mail.com') {
    return {
        id: utilService.makeId(),
        subject,
        body,
        isRead,
        sentAt: Date.now(),
        from
    }
}