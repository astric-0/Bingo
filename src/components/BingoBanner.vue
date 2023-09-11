<script setup>
defineProps({
    completed: Number
});

const banner = [' ', 'B', 'I', 'N', 'G', 'O'];
</script>

<template>
    <div class="w-100 d-flex mt-4">
        <div class="mx-auto btn-group">
            <button 
                v-for="i in 5" 
                :class="'col-1 btn btn-lg btn-outline-primary ' + (i <= completed ? 'active' : '')"
            > 
                    {{ banner[i] }} 
            </button>
        </div>
    </div>
</template>