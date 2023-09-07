<script>
import { ref } from 'vue'
export default {
    setup() {
        const username = ref('')
        
        const handleInput = key => event => {
            console.log("on change")
            username.value = event.target.value;
        }

        //const handleInput = event => username.value = event.target.value
        return { username, handleInput }
    }
}
</script>

<template>
    <h1>{{ username }}</h1>
    <div class="group">
        <label>Username*</label>
        <input type="text" v-model="username" />
    </div>

    <div class="group">
        <label for="">Password*</label>
        <input type="password" autocomplete="off" />
    </div>

    <div class="group">
        <button class="btn">Login</button>
    </div>
</template>

<style scoped>
    div .group {
        margin: 2vh;
    }

    label {
        display: block;
    }

    input {
        border-radius: 0.3vh;
        border-style: none;
        outline: 0.2vh solid rgb(141, 141, 213);
        height: 2.5vh;
    }

    .btn {
        padding: 0.6vh;
        background-color: white;
        color: rgb(141, 141, 213);
        border-radius: 0.3vh;
        border: 0.2vh solid rgb(141, 141, 213);
    }
</style>