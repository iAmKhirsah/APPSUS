export default {
    props: ['book'],
    template: `
        <div class="book-preview">
            <h1>{{book.title}}</h1>
            <h3>Price : {{book.listPrice.amount}}{{bookPrice}}</h3>
            <img :src="thumbnail"/>
        </div>
    `,
    data() {
        return {
            thumbnail: this.book.thumbnail
        }
    },
    computed: {
        bookPrice() {
            switch (this.book.listPrice.currencyCode) {
                case 'EUR':
                    return ' €';
                case 'USD':
                    return ' $';
                case 'ILS':
                    return ' ₪';
                default:
                    return ' ₪';
            };
        }
    }
}