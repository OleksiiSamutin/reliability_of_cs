const sample_data = [
  166, 1975, 995, 1897, 1253, 840, 181, 1024, 383, 967, 260, 188, 1420, 53,
  2893, 67, 787, 784, 667, 1572, 1480, 589, 607, 270, 618, 396, 518, 1307, 204,
  160, 1461, 1850, 952, 5767, 3518, 56, 829, 168, 664, 695, 2237, 298, 1154,
  542, 403, 1541, 76, 950, 847, 1054, 72, 1296, 886, 486, 26, 2098, 463, 1815,
  1416, 1743, 218, 344, 1269, 288, 1137, 175, 39, 293, 618, 794, 2142, 40, 915,
  676, 1640, 166, 538, 875, 215, 211, 2959, 961, 140, 28, 649, 457, 1935, 727,
  1545, 76, 46, 2007, 1881, 689, 398, 340, 8, 2959, 461,

  328,
];
const Tavg = sample_data.reduce((a, b) => a + b) / sample_data.length;
console.log("середній наробіток до відмови:", Tavg);
const y = 0.91;
const trouble_free_time = 3168;
const P = 5210;
const k = 10;
const sorted_data = sample_data.sort((a, b) => a - b);

const max_time_before_fail = sorted_data[sorted_data.length - 1];
const h = max_time_before_fail / 10;

let intervals = [];
for (let i = 1; i <= 10; i++) {
  intervals.push([h * (i - 1), h * i]);
}

//значення статистичної щільності розподілу
const f = intervals.map(
  ([min, max]) =>
    sorted_data.filter((el) => el >= min && el <= max).length / 100 / h
);

//значення ймовірності безвідмовної роботи пристрою на час правої границі інтервалу
const Parr = f.map((el) => 1 - el * h);
const d = Parr[0] - y / (Parr[0] - 1);
const T = h - h * d;


let count = 0;
for (let i =0; i <=10; i++){

    if (trouble_free_time > intervals[i][1] ){
        count+=f[i]*h
    } else {
        let res = 1 - count - f[i]* (trouble_free_time - intervals[i][0])
        console.log(`Ймовірність безвідмовної роботи на час ${trouble_free_time} годин:`, res);
        break
    }
}


let res = 0;
let count2 = 0
for (let i =0; i <=10; i++){

    if (P > intervals[i][1] ){
        count2+=f[i]*h
    } else {
        let res = 1 - count2 - f[i]* (P - intervals[i][0])
        console.log(`Інтенсивність відмов на час ${P}:`, f[i] / res);
        break
    }
}

