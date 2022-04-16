const { factorial } = require('mathjs')
const { generateP, resOfTruthElem, INIT_P } = require('../lab2/main.js');
// Кратність загальне ненавантажене резервування
const UNLOADED_MULTIPLICITY = 1;
// Кратність роздільного навантажене резервування
const LOADED_MULTIPLICITY = 3;

const P = generateP(resOfTruthElem, INIT_P)
const T = 1010;

const logResult = (T, P, Q, Tavg, Gq, Gp, Gt, type, form) => {
    console.log(`Ймовірність безвідмовної роботи на час ${T} годин системи з ${type} ${form} резервуванням з кратністю ${UNLOADED_MULTIPLICITY}: ${P}`);
    console.log(`Ймовірність відмови на час ${T} годин системи з ${type} ${form} резервуванням з кратністю ${UNLOADED_MULTIPLICITY}: ${Q}`);
    console.log(`Cередній наробіток системи на час ${T} годин системи з ${type} ${form} резервуванням з кратністю ${UNLOADED_MULTIPLICITY}: ${Tavg}`);
    console.log(`Виграш надійності протягом часу ${T} годин за ймовірністю відмов: ${Gq}`);
    console.log(`Виграш надійності протягом часу ${T} годин за ймовірністю безвідмовної роботи: ${Gp}`);
    console.log(`Виграш надійності протягом часу ${T} годин за середнім часом безвідмовної роботи: ${Gt}`);
    console.log('-----------------------------')
}
//------------------------------
const generateCalculationForReservedSystem = (T, K, baseP, INIT_P, type, form) => {
    const generateQ = (P) => 1 - P;
    const calculateDividedLoadedP = (p, k) => 1 - Math.pow((1 - p), k + 1);
    const generateBaseP = generateQ;
    const genereateTavg = (T, P) => - T / (Math.log(P));
    const QgeneralUnloaded = (Q, K) => 1 / factorial(1 + K) * Q;
    const PgeneralUnloaded = (P, K) => 1 - (1 / factorial(1 + K) * (1 - P));
    const PgeneralLoaded = (P, K) => 1 - Math.pow(1 - P, 1 + K);
    const qualityResult = (newResult, base) => newResult / base;
    const baseQ = generateQ(baseP);
    const baseT = genereateTavg(T, baseP);
    switch (type) {
        case 'загальна':
            switch (form) {
                case 'навантажена':
                    const P = PgeneralLoaded(baseP, K);
                    const Q = generateQ(P);
                    const Tavg = genereateTavg(T, P);
                    logResult(T, P, Q, Tavg, qualityResult(Q, baseQ), qualityResult(P, baseP), qualityResult(Tavg, baseT), type, form)
                    break;

                case 'не навантажена':
                    const Qunloaded = QgeneralUnloaded(baseQ, K)
                    const Punloaded = generateBaseP(Qunloaded);
                    const Tunloaded = genereateTavg(T, Punloaded);
                    logResult(T, Punloaded, Qunloaded, Tunloaded, qualityResult(Qunloaded, baseQ), qualityResult(Punloaded, baseP), qualityResult(Tunloaded, baseT), type, form)
                    break;

            }
            break
        case 'роздільна':
            switch (form) {
                case 'навантажена':
                    const P = generateP(resOfTruthElem, INIT_P.map(p => calculateDividedLoadedP(p, K)));
                    const Q = generateQ(P);
                    const Tavg = genereateTavg(T, P);
                    logResult(T, P, Q, Tavg, qualityResult(Q, baseQ), qualityResult(P, baseP), qualityResult(Tavg, baseT), type, form)
                    break
                case 'не навантажена':
                    const Punloaded = PgeneralUnloaded(generateP(resOfTruthElem, INIT_P.map(p => calculateDividedLoadedP(p, K))), K);
                    const Qunloaded = generateQ(P);
                    const Tunloaded = genereateTavg(T, Punloaded);
                    logResult(T, Punloaded, Qunloaded, Tunloaded, qualityResult(Qunloaded, baseQ), qualityResult(Punloaded, baseP), qualityResult(Tunloaded, baseT), type, form)
                    break
            }
            break
    }
}
console.log(generateCalculationForReservedSystem(T, UNLOADED_MULTIPLICITY, P, INIT_P, 'загальна', 'не навантажена'))
console.log(generateCalculationForReservedSystem(T, LOADED_MULTIPLICITY, P, INIT_P, 'роздільна', 'навантажена'))

