<script setup>
defineProps({
    stats: {
        type: Array,
        default: []
    }
})

const getClass = player => `fw-bold ${ player == 'user' ? 'text-primart' : 'text-danger' }`;
</script>

<template>
    <div v-if="stats.length == 0" class="my-2">
        <h3 class="text-danger text-center">No Games Played</h3>
    </div>
    <ol v-else class="list-group list-group-numbered my-3">
        <li 
            v-for="stat in stats" 
            class="list-group-item d-flex justify-content-between align-items-start"
        >
            <div class="ms-2 me-auto">
                <div :class="getClass(stat.player)">Winner {{ stat.winnerName }}</div>
                {{ stat.time }}
            </div>
            <span class="badge bg-primary rounded-pill">{{ stat.winnerName }}</span>
        </li>
    </ol>
</template>