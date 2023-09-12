<script setup>
const props = defineProps({
    label: String,
    click: Function,
    color: {
        type: String,
        default: 'dark'
    },
    outline: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: false
    }
})

const getClasses = _ => `mx-auto btn btn-${ props.outline ? 'outline-' : '' }${ props.color } btn-lg ${ props.active ? 'active' : '' }`;
</script>

<template>
    
        <button :class="getClasses()" @click="click()"> {{ label }} </button>

</template>