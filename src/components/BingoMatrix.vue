<script setup>
defineProps({
    matrix: Object,
    markCube: Function
})
</script>

<template>
    <div class="row justify-content-center" v-for="(row, rindex) in matrix" :key="rindex">
        <BingoButton 
            v-for="(col, cindex) in row" 
            :key="userMatrix[rindex][cindex]" 
            :button="col" 
            :rindex="Number(rindex)"
            :cindex="Number(cindex)" :markCube="markCube" 
        />
    </div>
</template>