<script setup>
import BingoButton from './BingoButton.vue';
defineProps({
    matrix: Object,
    markCube: Function,
    color: {
        type: String,
        default: 'primary'
    },
    player: {
        type: String,
        default: 'user'
    },
    completedPatterns: Number
})
</script>

<template>
    <div class="row justify-content-center" v-for="(row, rindex) in matrix" :key="rindex">
        <BingoButton 
            v-for="(col, cindex) in row" 
            :key="matrix[rindex][cindex]"
            :button="col" 
            :rindex="Number(rindex)"
            :cindex="Number(cindex)" 
            :markCube="markCube" 
            :color="color"
            :disabled="matrix.length <= completedPatterns"
        />
    </div>
</template>