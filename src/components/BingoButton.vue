<script setup>
let props = defineProps({
    button: Object,
    rindex: Number,
    cindex: Number,
    markCube: Function
})

const selectedStyle = ' btn-primary disabled '
const notSelectedStyle = ' btn-outline-primary '
const commonStyle = 'w-100 btn rounded '
const classes = commonStyle + (props.button.marked ? selectedStyle : notSelectedStyle)

</script>

<template>
    <div class="col my-1">
        <button :class="classes" @click="markCube(rindex, cindex, button.letter, 'user')">
            {{ button.letter }}
        </button>
    </div>
</template>