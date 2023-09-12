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
    
    return { completedPatterns, row, col };
}

export default checkPattern;