import { asyncStorageService } from "../../../../services/async-storage-service.js";
import { storageService } from "../../../../services/storage.service.js";
import { utilService } from "../../../../services/util.service.js";

export const emailService = {
    query,
    save,
    getById,
    remove,
    sortBy,
    createEmail

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

function query(criteria, isStarred) {
    if (isStarred) return asyncStorageService.query(EMAILS_KEY).then(emails => emails.filter(email => email.isStarred === true));
    return asyncStorageService.query(EMAILS_KEY).then(emails => emails.filter(email => email.criteria === criteria))
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

function sortBy(emails, sortBy) {
    switch (sortBy) {
        case 'new':
            return emails.sort(function(a, b) { return a.sentAt - b.sentAt });
        case 'old':
            return emails.sort(function(a, b) { return b.sentAt - a.sentAt });
        case 'subject':
            return emails.sort(function(a, b) { return a.subject.localeCompare(b.subject) })
        default:
            return emails;
    }
}

function createEmail(criteria = 'inbox',
    subject = 'Incoming mail',
    body = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sollicitudin quam.',
    isRead = false,
    from = 'Anonymouse@mail.com',
    isStarred = false) {
    return {
        id: utilService.makeId(),
        subject,
        body,
        isRead,
        sentAt: Date.now() + Math.random() * 100000,
        from,
        criteria,
        isStarred
    }
}

function _createEmails() {
    let emails = storageService.loadFromStorage(EMAILS_KEY);
    if (!emails || !emails.length) {
        emails = [
            createEmail('draft', 'oh-oh, your prescription is expiring', 'Writing a business email is far easier when you know how to structure it. Here are the key components your message should contain.', true, 'simple@example.com'),
            createEmail('inbox', 'You’re missing out on points.', 'This is the crucial part of your email which defines if a person actually opens it. A good subject line informs a recipient what the email is about and why they should', false, 'very.common@example.com'),
            createEmail('trash', '[URGENT] You’ve got ONE DAY to watch this', 'Marketing Budget Q4: Please review till August, 31', true, 'other.email-with-hyphen@example.com'),
            createEmail('trash', 'Your 7-figure plan goes bye-bye at midnight', 'tart a formal email? At the beginning of your email, greet a person by name. Depending on the level of formality, your s', false, 'fully-qualified-domain@example.com'),
            createEmail('draft', '[WEEKEND ONLY] Get this NOW before it’s gone', 'simple “Hi” to an official “Dear Mr./Ms./Dr./Professor…” For the most formal occasions, use a colon', false, 'example-indeed@strange-example.com'),
            createEmail('draft', 'Mary, Earn double points today only', 'Here are some email greeting examples', false, 'admin@mailserver1'),
            createEmail('inbox', 'Tonight only: A denim lover’s dream', 'eview your quarterly report and discuss the hiring strategy for your department. This is too much information for a single email! It’s better to send two separate', false, 'user-@example.org'),
            createEmail('inbox', 'Don’t Open This Email', `Break your message into paragraphs and take advantage of headings and lists. Where it’s appropriate, emphasize the key information with bold or italics, just don’t overdo it. Your goal is to make your email as structured and easy to skim as possibl`, true, 'Abc.example.com'),
        ]
        storageService.saveToStorage(EMAILS_KEY, emails);
    }
}