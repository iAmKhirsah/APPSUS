import { bookService } from "../services/book-service.js";
import { eventBus } from "../services/event-bus-service.js";

export default {
    props: ['bookReview', 'book'],
    template: `
    <section>
        <h3>Name : {{bookReview.fullName}}</h3>
        <h3>Date : {{bookReview.date}}</h3>
        <h3>Rate : {{bookReview.rate}}</h3>
        <h3>Review : {{bookReview.review}}</h3>
        <button @click="remove">x</button>
    </section>`,
    methods: {
        remove() {
            let reviews = this.book.reviews;
            let reviewIdx = reviews.findIndex(review => review.idx === this.bookReview.idx)
            reviews.splice(reviewIdx, 1);
            bookService.save(this.book)
                .then(() => {
                    const msg = {
                        txt: 'Review Deleted Successfully!',
                        type: 'success'
                    }
                    eventBus.$emit('showMsg', msg);
                })
                .catch(err => {
                    const msg = {
                        txt: 'Error! Please try again!',
                        type: 'error'
                    }
                    eventBus.$emit('showMsg', msg);
                });
        }
    }
}