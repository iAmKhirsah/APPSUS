export default {
    name: 'compose-sort',
    template: `
        <section class="compose-sort">
            <button>Compose</button>
                <select v-model="sortBy" @change="selected">
                    <option>date</option>
                    <option>title</option>
                </select>
        </section>  
    `,
    data() {
        return {
            sortBy: null
        }
    },
    methods: {
        selected() {
            console.log(this.sortBy);
        }
    }
};