const { factorial } = require('mathjs')
const { generateP, resOfTruthElem, INIT_P } = require('../lab2/main.js');
// Кратність загальне ненавантажене резервування
const UNLOADED_MULTIPLICITY = 1;
// Кратність роздільного навантажене резервування
const LOADED_MULTIPLICITY = 1;

const P = generateP(resOfTruthElem, INIT_P)
const T = 1010;
// const Q = 1 - P;
// const Tavg = - T / (Math.log(P));
const calculateDividedLoadedP = (p, k) => 1 - Math.pow((1 - p), k);
// const UNLOADED_NEW_P = INIT_P.map(el => calculateDividedLoadedP(el, LOADED_MULTIPLICITY));
// console.log(`Ймовірність відмови на час ${T} годин: ${Q}`,);
// console.log(`Cередній наробіток до відмови системи без резервування: ${Tavg}`);
// const Qunload = 1 / factorial(1 + UNLOADED_MULTIPLICITY) * Q;
// console.log(`Ймовірність відмови на час ${T} годин системи з
// загальним ненавантаженим резервуванням з кратністю ${UNLOADED_MULTIPLICITY}:
// ${Qunload}`);
// const Punload = 1 - Qunload;
// console.log(`Ймовірність безвідмовної роботи на час ${T} годин системи з
// загальним ненавантаженим резервуванням з кратністю ${UNLOADED_MULTIPLICITY}:
// ${Punload}`);
// const Tunload = - T / (Math.log(Punload));
// console.log(`Cередній наробіток системи на час ${T} годин системи з
// загальним ненавантаженим резервуванням з кратністю ${UNLOADED_MULTIPLICITY}:
// ${Tunload}`);
// const Gq = Qunload / Q;
// console.log(`Виграш надійності протягом часу ${T} годин за ймовірністю відмов:
// ${Gq}`);
// const Gp = Punload / P;
// console.log(`Виграш надійності протягом часу ${T} годин за ймовірністю безвідмовної роботи:
// ${Gp}`);
// const Gt = Tunload / T;
// console.log(`Виграш надійності протягом часу ${T} годин за середнім часом безвідмовної роботи:
// ${Gt}`);
const logResult = (T, P, Q, Tavg, Gq, Gp, Gt, type, form) => {
    console.log(`Ймовірність безвідмовної роботи на час ${T} годин системи з ${type} ${form} резервуванням з кратністю ${UNLOADED_MULTIPLICITY}: ${P}`);
    console.log(`Ймовірність відмови на час ${T} годин системи з ${type} ${form} резервуванням з кратністю ${UNLOADED_MULTIPLICITY}: ${Q}`);
    console.log(`Cередній наробіток системи на час ${T} годин системи з ${type} ${form} резервуванням з кратністю ${UNLOADED_MULTIPLICITY}: ${Tavg}`);
    console.log(`Виграш надійності протягом часу ${T} годин за ймовірністю відмов: ${Gq}`);
    console.log(`Виграш надійності протягом часу ${T} годин за ймовірністю безвідмовної роботи: ${Gp}`);
    console.log(`Виграш надійності протягом часу ${T} годин за середнім часом безвідмовної роботи: ${Gt}`);
}
//------------------------------
const generateCalculationForReservedSystem = (T, K, baseP, INIT_P, type, form) => {
    const generateQ = (P) => 1 - P;
    const calculateDividedLoadedP = (p, k) => 1 - Math.pow((1 - p), k);
    const generateBaseP = generateQ;
    const genereateTavg = (T, P) => - T / (Math.log(P));
    const QgeneralUnloaded = (Q, K) => 1 / factorial(1 + K) * Q;
    const qualityResult = (newResult, base) => newResult / base;
    const baseQ = generateQ(baseP);
    const baseT = genereateTavg(T, baseP);
    switch (type) {
        case 'загальна':
            switch (form) {
                case 'навантажена':

                    break;

                case 'не навантажена':
                    const Q = QgeneralUnloaded(baseQ, K)
                    const P = generateBaseP(Q);
                    logResult(T, P, Q, genereateTavg(T, P), qualityResult(Q, baseQ), qualityResult(P, baseP), qualityResult(T, baseT), type, form)
                    break;

            }
            break
        case 'роздільна':
            switch (form) {
                case 'навантажена':
                    const P = generateP(resOfTruthElem, INIT_P.map(p => calculateDividedLoadedP(p, K)));
                    const Q = generateQ(P);
                    logResult(T, P, Q, genereateTavg(T, P), qualityResult(Q, baseQ), qualityResult(P, baseP), qualityResult(T, baseT), type, form)
                    break
                case 'не навантажена':
                    break
            }
            break
    }
}
console.log(generateCalculationForReservedSystem(T, UNLOADED_MULTIPLICITY, P, INIT_P, 'загальна', 'не навантажена'))
console.log('-----------------------------')
console.log(generateCalculationForReservedSystem(T, UNLOADED_MULTIPLICITY, P, INIT_P, 'роздільна', 'навантажена'))

