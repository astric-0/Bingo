<script setup>
import maker from '../utils/maker';
import store from '../store';
import { ref } from 'vue';

import BingoButton from '../components/BingoButton.vue';

const userMatrix = ref(maker());
const computerMatrix = ref(maker());

const getMarker = (m, r, c) => {
    return { ...m[r][c], marked: true }
}

const checkPattern = activeMatrix => {
    for (let i = 0; i < activeMatrix.value.length; i++) {
        for (let j = 0; j < activeMatrix.value[i].length; j++) {
            
        }
    }
}

const markCube = (rindex, cindex, letter, player) => {
    const [ activeMatrix, passiveMatrix ] = (player == 'user') 
        ? [ userMatrix, computerMatrix ]
        : [ computerMatrix, userMatrix ]
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