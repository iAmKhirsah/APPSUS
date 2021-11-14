import bookAdd from '../cmps/book-add.cmp.js';
export default {
    template: `
        <section class="home-page">
            <img src="./img/bookHome.png"/>
         <p>Online Book store is an online web application where the customer can purchase books online. Through a web browser the customers can search for a book by its title or author, later can add to the shopping cart and finally purchase using credit card transaction.</p>
        <book-add></book-add>
        </section>
    `,
    components: {
        bookAdd,
    }
}