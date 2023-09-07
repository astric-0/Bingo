<script setup>
defineProps({
    button: Object
})

const selectedStyle = ' btn-primary disabled '
const notSelectedStyle = ' btn-outline-primary '
const commonStyle = ' w-100 btn rounded '
const classes = commonStyle + (button.isSelected ? selectedStyle : notSelectedStyle)
</script>

<template>
    <button :class="classes">
        {{ button.value }}
    </button>
</template>