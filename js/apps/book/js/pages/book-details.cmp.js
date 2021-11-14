import longText from './../cmps/long-text.cmp.js';
import { bookService } from '../services/book-service.js';
import reviewAdd from '../cmps/review-add.cmp.js';
import showReview from '../cmps/show-review.cmp.js';
import { eventBus } from "../services/event-bus-service.js";

export default {
    name: 'book-details',
    template: `
        <section v-if="book" class="book-details">
            <img :src="book.thumbnail">
            <span>Title : {{book.title}}</span>
            <span>Subtitle : {{book.subtitle}}</span>
            <ul>Authors :
                <li v-for="(author, idx) in book.authors" :key="idx">
                    {{author}}
                </li>
            </ul>
            <span>Published date : {{book.publishedDate}}</span>
            <span>{{publishedDate}}</span>
            <span>Description : </span>
            <div class='show-description' v-if="isLongDescription">
            <long-text :txt="book.description"/>
            </div>
            <long-text v-else :txt="book.description"/>
            <span>Pages : {{book.pageCount}}</span>
            <span>{{pageCount}}</span>
            <span>Price : <span :class="priceColor">{{this.book.listPrice.amount}}</span></span>
            <img v-if="book.listPrice.isOnSale":src="salePath"/>
            <button class="details-btn" v-if="book.reviews && book.reviews.length" @click="isShowReviews = !isShowReviews">{{showReviewButton}}</button>
            <ul v-if="isShowReviews" class="review-list" >
                <li v-for="(review, idx) in book.reviews">
                    <show-review class='show-review':bookReview="review" :book="book"></show-review>
                    <span>_</span>    
                </li>
            </ul>
            <button class="details-btn" @click="isAddReview = !isAddReview">Add review</button>
            <review-add class='review-add' v-if="isAddReview" @addReview="addReview"></review-add>
            <router-link to='/book' class="back-btn">X</router-link>
            <section class='pages'>
            <router-link :to="'/book/' + prevBookId">< Prev book </router-link>
            <router-link :to="'/book/' + nextBookId">Next book > </router-link>
            </section>
        </section>
    `,

    data() {
        return {
            salePath: './img/sale.png',
            book: null,
            isAddReview: false,
            isShowReviews: false,
            nextBookId: 0,
            prevBookId: 0,
        }
    },
    created() {},
    methods: {
        addReview(book, review) {
            this.book = book;
            bookService.addReview(this.book, review)
                .then(() => {
                    this.isAddReview = false;
                    const msg = { txt: 'Book review added successfully!', type: 'success', link: '/book/' + book.id };
                    eventBus.$emit('showMsg', msg);
                })

        },
        pageDirection(direction) {
            this.direction = direction;
        }
    },
    watch: {
        '$route.params.bookId': {
            handler() {
                const bookId = this.$route.params.bookId;
                bookService.getById(bookId)
                    .then((book) => this.book = book)
                bookService.besidePageIdx(bookId, 1)
                    .then(bookId => this.nextBookId = bookId);
                bookService.besidePageIdx(bookId, -1)
                    .then(bookId => this.prevBookId = bookId);

            },
            immediate: true
        }
    },
    computed: {
        pageCount() {
            let { pageCount } = this.book
            if (pageCount > 500) return 'Long reading';
            else if (pageCount > 200) return 'Decent reading';
            else if (pageCount > 100) return 'Light reading';
        },
        publishedDate() {
            const currYear = new Date().getFullYear();
            if (currYear - +this.book.publishedDate > 10) return 'Veteran book'
            else if (currYear - +this.book.publishedDate < 1) return 'New book'
            return '';
        },
        priceColor() {
            if (this.book.listPrice.amount > 150) return 'red-price';
            else if (this.book.listPrice.amount < 50) return 'green-price';
            else return '';
        },
        showShortDescription() {
            return this.book.description.slice(1, 100);
        },
        isLongDescription() {
            return this.book.description.length > 100;
        },
        showReviewButton() {
            return (!this.isShowReviews) ? 'Show reviews' : 'Hide reviews';
        }
    },
    components: {
        longText,
        reviewAdd,
        showReview
    }
}