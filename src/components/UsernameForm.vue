<script setup>
import store from '../store'
import { ref } from 'vue'
import router from '../router';

const username = ref('')
</script>

<template>
    <div class="container d-flex align-items-center vh-100">
        <div class="row w-100 justify-content-center">            
            <div class="col-12 col-md-6 form-group">
               
                <label for="">Enter Your Name*</label>
                <input v-model="username" class="form-control" placeholder="It's Bingo Time" />

                <div class="d-flex mt-3">
                    <button 
                        class="mx-auto btn btn-primary" 
                        @click="_ => { 
                            store.mutations.setUsername(username)
                            router.push({ name: 'Game' })                            
                        }"
                    >
                        Start
                    </button>
                </div> 

            </div>
        </div>
    </div>
</template>

<style scoped>
    .center {
        display: flex;
        place-content: center;    
    }
</style>