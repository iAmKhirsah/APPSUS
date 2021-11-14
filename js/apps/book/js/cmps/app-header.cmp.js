export default {
    template: ` 
    <header class="app-header">
        <div class="logo">
            <h1>Book Shop</h1>
        </div>
        <nav>
            <router-link to="/bookhome">Home</router-link> |
            <router-link to="/book">Book Shop</router-link> |
            <router-link to="/about">About</router-link>
        </nav>
    </header>
    `,
}