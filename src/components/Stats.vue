<script setup>
const props = defineProps({
    stats: {
        type: Array,
        default: []
    }
})

const getClass = player => `fw-bold ${ player == 'user' ? 'text-primary' : 'text-danger' }`;
const getListItemClass = player => `list-group-item list-group-item-${ player == 'user' ? 'primary' : 'danger' } d-flex justify-content-between align-items-start`
const winSummary = (_ => {
    let userWins = 0;
    props.stats.forEach(stat => {
        if (stat.player == 'user')
            userWins++;
    })

    const len = props.stats.length;
    return { userWins, computerWins: len - userWins, total: len }
})();
</script>

<template>
    <div v-if="stats.length == 0" class="my-2">
        <h3 class="text-danger text-center">No Games Played</h3>
    </div>
    <div v-else>
        <ol class="list-group list-group-numbered my-3">
            <li 
                v-for="stat in stats" 
                :class="getListItemClass(stat.player)"
            >
                <div class="ms-2 me-auto">
                    <div :class="getClass(stat.player)">Winner {{ stat.winnerName }}</div>
                    {{ stat.time }}
                </div>
                <span class="badge bg-primary rounded-pill">{{ stat.player }}</span>
            </li>
        </ol>
        <button class="btn btn-outline-primary w-100 my-2">
            Your Win Count: <span class="fw-bold">{{ winSummary.userWins }}</span>
        </button>
        <button class="btn btn-outline-danger w-100 my-2">
            My Win Count: <span class="fw-bold">{{ winSummary.computerWins }}</span>
        </button>
        <button class="btn btn-outline-dark w-100 my-2">
            Total Matches: <span class="fw-bold">{{ winSummary.total }}</span>
        </button>
    </div>

</template>