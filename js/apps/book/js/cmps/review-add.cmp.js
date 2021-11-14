import { bookService } from "../services/book-service.js";
import { utilService } from "../services/util-service.js";

export default {
    template: `
        <form @submit="save">
            <label for="full-name-input"> Full name : 
                <input id="full-name-input" v-model="review.fullName" type="text" placeholder="Full name" required>
            </label>
            <label for="rate"> Rate : 
                <select v-model="review.rate" id="rate">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
            </label>
            <label for="rate"> Date : 
                <input v-model="review.date" type="date">
            </label>
            <label for="text-review"> Review : 
                <textarea id="text-review" v-model="review.review" cols="30" rows="10" placeholder="Enter your review here..."></textarea>
            </label>
            <button  class="details-btn">Submit</button>
        </form>
    `,
    data() {
        return {
            book: null,
            review: { idx: utilService.makeId(), fullName: '', rate: '', date: '', review: '' }
        }
    },
    created() {
        const { bookId } = this.$route.params;
        bookService.getById(bookId)
            .then(book => this.book = book);

    },
    methods: {
        save() {
            this.$emit('addReview', this.book, this.review)
        }
    }
}