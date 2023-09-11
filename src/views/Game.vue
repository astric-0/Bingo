<script setup>
import maker from '../utils/maker';
import store from '../store';
import { ref } from 'vue';

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

    for (let i = 0; i < len; i++) {
        let hCounter = 0, vCounter = 0;
        for (let j = 0; j < len; j++) {
            activeMatrix[i][j].marked == true && hCounter++;
            activeMatrix[j][i].marked == true && vCounter++;
        }

        hCounter == len && completedPatterns++;
        vCounter == len && completedPatterns++;
    }

    let diagonalLeft = 0, diagonalRight = 0;
    for (let i = 0; i < len; i++) {
        activeMatrix[i][i].marked && diagonalLeft++;
        activeMatrix[i][len-i-1].marked && diagonalRight++;
    }
  
    diagonalLeft == 5 && completedPatterns++;
    diagonalRight == 5 && completedPatterns++;
    console.log(completedPatterns)
    return { completedPatterns };
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
        </div>
    </div>
</template>