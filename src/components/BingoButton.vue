<script setup>
const props = defineProps({
    button: Object,
    rindex: Number,
    cindex: Number,
    markCube: Function,
    color: {
        type: String, 
        default: 'primary'
    },
    player: {
        type: String,
        default: 'user'
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const selectedStyle = ` btn-${ props.color } disabled `
const notSelectedStyle = ` text-${ props.color } `
const commonStyle = `w-100 btn rounded shadow `
const classes = commonStyle + (props.button.marked ? selectedStyle : notSelectedStyle)

</script>

<template>
    <div class="col my-1">
        <button :class="classes" @click="markCube(rindex, cindex, button.letter, player)" :disabled="disabled">
            {{ button.letter }}
        </button>
    </div>
</template>