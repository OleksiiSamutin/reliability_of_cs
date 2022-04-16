const INIT_P = [0.69, 0.62, 0.53, 0.32, 0.33, 0.28];
const ADJANCENCY_MATRIX = [
    [0, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0],
    [0, 0, 0, 1, 0, 1],
    [0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
];

let resP = 0;

const generateTruthTable = (INIT_P) => {
    const res = [];
    for (let i = (Math.pow(2, INIT_P.length) - 1); i >= 0; i--) {
        const row = [];
        for (let j = (INIT_P.length - 1); j >= 0; j--) {
            row[j] = (i & Math.pow(2, j)) ? 1 : 0
        }
        res.push(row)
    }
    return res;
}
const truthTable = generateTruthTable(INIT_P);


const deepSearch = (m, row = 0, res =
    new Array(m.length).fill(1, 0, 1).fill(0, 1, m.length), cache = []
) => {
    if (m[row].filter(el => el !== 0).length === 0) {
        cache.push(res)
    }
    m[row].forEach((el, i, array) => {
        if (el === 1) {
            let result = [...res];
            result[i] = 1;
            deepSearch(m, i, result, cache);
        }
    })
    return cache
}

const critPaths = deepSearch(ADJANCENCY_MATRIX);
const resOfTruthElem = new Set();
truthTable.forEach(truthEl => {
    critPaths.forEach(critPath => {
        const numberOfOnes = critPath.filter(el => el === 1).length;
        let counter = 0;
        critPath.forEach((el, i, array) => {
            if (el === 1 && truthEl[i] === 1) {
                counter++
            }
        })
        if (counter === numberOfOnes) {
            resOfTruthElem.add(truthEl);
        }
    })
})

const generateP = (resOfTruthElem, pArr) => {
    let resP = 0;
    resOfTruthElem.forEach(path => {
        let multiplyQ;
        path.forEach((el, i) => {
            if (el === 1) {
                if (!multiplyQ) {
                    multiplyQ = pArr[i]
                } else {
                    multiplyQ *= pArr[i]
                }
            } else {
                if (!multiplyQ) {
                    multiplyQ = 1 - pArr[i]
                } else {
                    multiplyQ *= 1 - pArr[i]
                }
            }
        })
        resP += multiplyQ
    })
    return resP;
}

console.log('Ймовірність безвідмовної роботи системи:',generateP(resOfTruthElem, INIT_P))
module.exports = {generateP, resOfTruthElem,INIT_P}

