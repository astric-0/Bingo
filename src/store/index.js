import { reactive } from "vue"

const store = ({
    state: reactive({
        username: null
    }),

    getters: {
        getUsername() {
            return store.state.username
        }
    },

    mutations: {
        setUsername(value) {
            store.state.username = value
        }
    },

    action: {
        resetUsername() {
            store.state.username = null
        }
    }
})

export default store;