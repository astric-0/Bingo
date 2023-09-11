<script setup>
import maker from '../utils/maker';
import store from '../store';
import { ref } from 'vue';

import BingoBanner from '../components/BingoBanner.vue';
import BingoButton from '../components/BingoButton.vue';

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

        if (hCounter > vCounter && hCounter > max.maxValue && hCounter < len) 
            max = { maxIndex: i, maxValue: hCounter, type: 'h' }

        if (vCounter > hCounter && vCounter > max.maxValue && vCounter < len)
            max = { maxIndex: i, maxValue: hCounter, type: 'v' }

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
    if (diagonalLeft > maxValue && diagonalLeft > diagonalRight && diagonalLeft < len)
        max = { maxIndex: -1, maxValue: diagonalLeft, type: 'dl' }
    if (diagonalRight > maxValue && diagonalRight > diagonalLeft && diagonalRight < len)
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
                return module.get(i)
        return [ -1, -1 ]
    }

    const [ row, col ] = processor(modules[max.type]);
    console.log(row, ':', col);
    return { completedPatterns, row, col };
}

const markCube = (rindex, cindex, letter, player) => {
    const [ activeMatrix, passiveMatrix, completedPattern ] = (player == 'user') 
        ? [ userMatrix, computerMatrix, userCompletedPatterns ]
        : [ computerMatrix, userMatrix, computerCompletedPatterns ]
    ;

    activeMatrix.value[rindex][cindex] = getMarker(activeMatrix.value, rindex, cindex);

    let breakFlag = false;
    for (let i = 0; i < passiveMatrix.value.length; i++) {
        for (let j = 0; j < passiveMatrix.value[i].length; j++) {
            if (passiveMatrix.value[i][j] == letter) {
                breakFlag = true;
                passiveMatrix.value[i][j] = getMarker(passiveMatrix.value, i, j);
                break;
            }
        }
        if (breakFlag) break;
    }

    const cals = checkPattern(activeMatrix.value);
    completedPattern.value = cals.completedPatterns;
}

</script>

<template>
    <div class="container d-flex align-items-center justify-content-center vh-100">
        <div class="w-50">
            <h4 class="text-center">{{ store.state.username }}</h4>
            <div class="row justify-content-center" v-for="(row, rindex) in userMatrix" :key="rindex">
                <BingoButton
                        v-for="(col, cindex) in row"
                        :key="userMatrix[rindex][cindex]"
                        :button="col" 
                        :rindex="Number(rindex)" 
                        :cindex="Number(cindex)" 
                        :markCube="markCube"
                    />            
            </div>
            <BingoBanner :completed="userCompletedPatterns" />
        </div>
    </div>
</template>