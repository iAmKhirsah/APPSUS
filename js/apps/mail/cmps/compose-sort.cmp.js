export default {
    name: 'compose-sort',
    template: `
        <section class="compose-sort">
            <button @click="compose">Compose</button>
            <span>Sort by : </span>
            <label for="new">new
                <input type="radio" name="sorting" value="new" id="new" v-model="sortBy" @change="selected"> 
            </label>
            <label for="old">old
                <input type="radio" name="sorting" value="old" id="old" v-model="sortBy" @change="selected"> 
            </label>
                <label for="subject">subject
                <input type="radio" name="sorting" value="subject" id="subject" v-model="sortBy" @change="selected"> 
            </label>
        </section>  
    `,
    data() {
        return {
            sortBy: null
        }
    },
    methods: {
        selected() {
            console.log('this.sortBy', this.sortBy);
            this.$emit('sortBy', this.sortBy);
        },
        compose() {
            this.$emit('compose');
        }
    }
};