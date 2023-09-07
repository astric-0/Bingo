<script setup>
import maker from '../utils/maker';
import store from '../store';
import { ref } from 'vue';

import BingoButton from '../components/BingoButton.vue';

const matrix = ref(maker());

</script>

<template>
    <div class="container d-flex align-items-center justify-content-center vh-100">
        <div class="w-50">
            <h4 class="text-center">{{ store.state.username }}</h4>
            <div class="row justify-content-center" v-for="row in matrix">
                <div class="col my-1" v-for="col in row">
                    <BingoButton :button="col" />
                </div>
            </div>

        </div>
    </div>
</template>