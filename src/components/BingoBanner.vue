<script setup>
defineProps({
    completed: Number,
    color: {
        type: String,
        default: 'primary'
    }
});

const banner = [' ', 'B', 'I', 'N', 'G', 'O'];
</script>

<template>
    <div class="w-100 d-flex my-4">
        <div class="mx-auto btn-group">
            <button 
                v-for="i in 5" 
                :class="`col-1 btn btn-lg btn-outline-${ color } ` + (i <= completed ? 'active' : '')"
            > 
                {{ banner[i] }} 
            </button>
        </div>
    </div>
</template>