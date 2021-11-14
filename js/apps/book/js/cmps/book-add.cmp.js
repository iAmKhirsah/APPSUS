import { bookService } from '../services/book-service.js';
import { utilService } from '../services/util-service.js';
import { eventBus } from '../services/event-bus-service.js';
export default {
    template: `
    <section class="book-add">
        <input type="text" v-model="search" id="book-search" placeholder="Search for a book"/>
        <button @click="submit">Submit</button>
        <ul v-if="books">
            <li v-for="(book, idx) in books">
                {{book.volumeInfo.title}}
                <button @click="addBook(book)">+</button>
            </li>
        </ul>
    </section>
    `,
    data() {
        return {
            search: null,
            books: null,
        }
    },
    methods: {
        submit() {
            this.books = null;
            axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${this.search}`)
                .then(books => {
                    this.books = books.data.items;
                });
        },
        addBook(book) {
            bookService.addGoogleBook(book)
                .then(() => {
                    const msg = { txt: 'Book added successfully!', type: 'success' };
                    eventBus.$emit('showMsg', msg);
                })
                .catch(() => {
                    const msg = { txt: 'Error! try again please', type: 'error' };
                    eventBus.$emit('showMsg', msg);
                });
            this.search = null;
            this.books = null;
        }
    }
}