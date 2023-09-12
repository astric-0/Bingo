<script setup>
import maker from '../utils/maker';
import store from '../store';
import { ref } from 'vue';

import BingoMatrix from '../components/BingoMatrix.vue';
import BingoBanner from '../components/BingoBanner.vue';

const userMatrix = ref(maker());
const computerMatrix = ref(maker());
const userCompletedPatterns = ref(0);
const computerCompletedPatterns = ref(0);

const getMarker = (m, r, c) => {
    return { ...m[r][c], marked: true }
}

const checkPattern = activeMatrix => {
    let completedPatterns = 0;
    const len = activeMatrix.length;

    let max = { maxIndex: -1, maxValue: -1, type: 'v' };

    for (let i = 0; i < len; i++) {
        let hCounter = 0, vCounter = 0;
        for (let j = 0; j < len; j++) {
            activeMatrix[i][j].marked == true && hCounter++;
            activeMatrix[j][i].marked == true && vCounter++;
        }

        if ((hCounter > vCounter || vCounter == len) && hCounter > max.maxValue && hCounter < len) 
            max = { maxIndex: i, maxValue: hCounter, type: 'h' }

        if ((vCounter >= hCounter || hCounter == len) && vCounter > max.maxValue && vCounter < len)
            max = { maxIndex: i, maxValue: vCounter, type: 'v' }

        hCounter == len && completedPatterns++;
        vCounter == len && completedPatterns++;
    }

    let diagonalLeft = 0, diagonalRight = 0;
    for (let i = 0; i < len; i++) {
        activeMatrix[i][i].marked && diagonalLeft++;
        activeMatrix[i][len-i-1].marked && diagonalRight++;
    }
  
    diagonalLeft == len && completedPatterns++;
    diagonalRight == len && completedPatterns++;    

    const { maxValue } = max;
    if (diagonalLeft >= maxValue && (diagonalLeft > diagonalRight || diagonalRight == len) && diagonalLeft < len)
        max = { maxIndex: -1, maxValue: diagonalLeft, type: 'dl' }
    if (diagonalRight >= maxValue && (diagonalRight >= diagonalLeft || diagonalLeft == len) && diagonalRight < len)
        max = { maxIndex: -1, maxValue: diagonalLeft, type: 'dr' }

    const modules = {
        'h': {
            process: counter => activeMatrix[max.maxIndex][counter],
            get: counter => [max.maxIndex, counter]
        },
        'v': {
            process: counter => activeMatrix[counter][max.maxIndex],
            get: counter => [counter, max.maxIndex]
        },
        'dl': {
            process: counter => activeMatrix[counter][counter],
            get: counter => [counter, counter]
        },
        'dr': {
            process: counter => activeMatrix[counter][len-counter-1],
            get: counter => [counter, len-counter-1]
        }
    }

    const processor = module => {
        for (let i = 0; i < len; i++)
            if(!module.process(i).marked)
                return module.get(i);
        return [ -1, -1 ]
    }

    const [ row, col ] = processor(modules[max.type]);
    console.log(row, ':', col);
    return { completedPatterns, row, col };
}

const markCube = (rindex, cindex, letter, player) => {
    const [ activeMatrix, passiveMatrix, activeCompletedPattern, passiveCompletedPattern ] = (player == 'user') 
        ? [ userMatrix, computerMatrix, userCompletedPatterns, computerCompletedPatterns ]
        : [ computerMatrix, userMatrix, computerCompletedPatterns, userCompletedPatterns ]
    ;

    activeMatrix.value[rindex][cindex] = getMarker(activeMatrix.value, rindex, cindex);
    const activeCals = checkPattern(activeMatrix.value);
    activeCompletedPattern.value = activeCals.completedPatterns;
    
    let breakFlag = false;
    const len = passiveMatrix.value.length;
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
    if (player == 'user') {
        const { row, col } = passiveCals;
        markCube(row, col, passiveMatrix.value[row][col].letter, 'computer');
    }    
}

</script>

<template>
    <div class="container d-flex align-items-center justify-content-center vh-100">
        <div class="w-50">
            <h4 class="text-center">{{ store.state.username }}</h4>            
            <BingoBanner :completed="userCompletedPatterns" />
            <BingoMatrix 
                :key="userMatrix" 
                :matrix="userMatrix" 
                :markCube="markCube"         
            />
            
            <BingoBanner :completed="computerCompletedPatterns" color="danger" />
            <BingoMatrix 
                :key="computerMatrix" 
                v-if="computerCompletedPatterns == computerMatrix.length" 
                :matrix="computerMatrix" 
                :markCube="markCube" 
                color="danger"
            />
        </div>
    </div>
</template>