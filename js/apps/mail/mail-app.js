import { mailService } from "./services/mail-service.js";
export default {
    template: `
      <h1>Hi mail</h1>
      `,
    data() {
        return {

        }
    },
    created() {
        mailService.query()
            .then(mails => console.log('mails', mails));
    }

}