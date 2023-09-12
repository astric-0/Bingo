<script setup>
import maker from '../utils/maker';
import store from '../store';
import { ref } from 'vue';
import Swal from 'sweetalert2';

import BingoMatrix from '../components/BingoMatrix.vue';
import BingoBanner from '../components/BingoBanner.vue';
import Button from '../components/Button.vue';
import Stats from '../components/Stats.vue';

import checkPattern from '../utils/checkPattern';

const userMatrix = ref(maker());
const computerMatrix = ref(maker());
const userCompletedPatterns = ref(0);
const computerCompletedPatterns = ref(0);
const winCounter = ref([]);

const checkStats = ref(false);

const toggleStats = _ => checkStats.value = !checkStats.value;

const getMarker = (m, r, c) => {
    return { ...m[r][c], marked: true }
}

const newGame = _ => {
    if (checkStats.value == true) toggleStats();
    computerMatrix.value = maker();
    userMatrix.value = maker();
    userCompletedPatterns.value = 0;
    computerCompletedPatterns.value = 0;
}

const checkWin = (player, completedPatterns, max = userMatrix.value.length) => {
    if (completedPatterns >= max) {
        winCounter.value.push({
            player,
            time: new Date().toLocaleString(),
            winnerName: player == 'user' ? store.getters.getUsername() ?? 'user' : 'Satan'
        });
        Swal.fire({
            'title': player == 'user' ? 'You Won' : 'I won'
        })

        return true;
    }
    return false;
}

const markCube = (rindex, cindex, letter, player) => {
    const [activeMatrix, passiveMatrix, activeCompletedPattern, passiveCompletedPattern] = (player == 'user')
        ? [userMatrix, computerMatrix, userCompletedPatterns, computerCompletedPatterns]
        : [computerMatrix, userMatrix, computerCompletedPatterns, userCompletedPatterns]
        ;

    const len = activeMatrix.value.length;

    activeMatrix.value[rindex][cindex] = getMarker(activeMatrix.value, rindex, cindex);
    const activeCals = checkPattern(activeMatrix.value);
    activeCompletedPattern.value = activeCals.completedPatterns;

    if (checkWin(player, activeCompletedPattern.value, len)) return;

    let breakFlag = false;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (passiveMatrix.value[i][j].letter == letter) {
                breakFlag = true;
                passiveMatrix.value[i][j] = getMarker(passiveMatrix.value, i, j);
                break;
            }
        }
        if (breakFlag) break;
    }

    const passiveCals = checkPattern(passiveMatrix.value);
    passiveCompletedPattern.value = passiveCals.completedPatterns;
    if (checkWin(player, activeCompletedPattern.value, len)) return;

    if (player == 'user') {
        const { row, col } = passiveCals;
        markCube(row, col, passiveMatrix.value[row][col].letter, 'computer');
    }
}

</script>

<template>
    <div class="container d-flex align-items-center justify-content-center vh-100">
        <div class="w-50">
            <div v-if="!checkStats">
                <h4 class="text-center">{{ store.state.username }}</h4>
                <BingoBanner :completed="userCompletedPatterns" />
                <BingoMatrix :key="userMatrix" :matrix="userMatrix" :markCube="markCube"
                    :completedPatterns="userCompletedPatterns" />
                <BingoBanner :completed="computerCompletedPatterns" color="danger" />

                <BingoMatrix :key="computerMatrix" v-if="computerCompletedPatterns >= computerMatrix.length"
                    :matrix="computerMatrix" :markCube="markCube" color="danger"
                    :completedPatterns="computerCompletedPatterns" />
            </div>
            <div v-else>
                <Stats :stats="winCounter" />
            </div>
            <div class="d-flex">
                <div class="btn-group mx-auto">
                    <Button label="New Game ?" :click="newGame" />
                    <Button label="Check Stats ?" color="primary" :click="toggleStats" :active="checkStats" outline />
                </div>
            </div>
        </div>
    </div>
</template>