export default function (max = 5) {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXY";
    let cubeMembers = chars.split('');
    
    let randomMembers = [];
    for (let i = 0; i < max; i++) {
        randomMembers.push([]);
        for (let j = 0; j < max; j++) {
            const index = Math.floor(Math.random() * cubeMembers.length);
            randomMembers[i].push({
                letter: cubeMembers[index],
                marked: false
            });
            cubeMembers.splice(index, 1);
        }
    }

    return randomMembers;
}