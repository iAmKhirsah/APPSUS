import { bookService } from '../services/book-service.js';
import bookList from '../cmps/book-list.cmp.js';
import bookFilter from '../cmps/book-filter.cmp.js';

export default {
    template: `
        <section class="book-app">
            <book-filter @filtered="setFilter" />
            <book-list :books="booksToShow"/>
        </section>
    `,
    data() {
        return {
            books: null,
            filterBy: null,
        };
    },
    created() {
        bookService.query()
            .then(books => this.books = books);
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy;
        }
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books;
            const searchStr = this.filterBy.title.toLowerCase();
            const from = (this.filterBy.fromPrice) ? this.filterBy.fromPrice : 0;
            const to = (this.filterBy.toPrice) ? this.filterBy.toPrice : Infinity;
            const booksToShow = this.books.filter(book => {
                const bookPrice = book.listPrice.amount;
                return book.title.toLowerCase().includes(searchStr) && bookPrice >= from && bookPrice <= to;
            });
            return booksToShow;
        }
    },
    components: {
        bookList,
        bookFilter,
    }
};