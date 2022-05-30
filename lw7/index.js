let variantF;
let isMemoize;
let isDebug;
let isSaveCallsCount;

function f1(x) {
    return Math.exp(x) + (Math.pow(Math.tan(4*x), 3)) / (1.5 + 5 * Math.sin(x));
}

function f2(x) {
    return Math.pow(Math.sin(x), 2) - Math.abs(Math.pow(x, 5) - Math.log(x) + Math.exp(x));
}

function f3(x) {
    return (Math.pow(Math.E, 3) + 6 * x) / (Math.pow(x, 5) - 4 * x);
}

function memoize(f) {
    let cache = {}

    const getKey = (arguments) => {
        return `${arguments.length}:${[].join.call([].map.call(arguments, (item) => item.toFixed(3)), " ")}`;
    }


    function memF() {
        let key = getKey(arguments);
        if (key in cache) {
            return cache[key];
        } else {
            return cache[key] = f.apply(this, arguments);
        }
    }


    memF.getPrecalculatedValue = function () {
        let key = getKey(arguments);

        if (key in cache) {
            return cache[key]
        }
        return null;
    }

    memF.getCacheSize = function () {
        return Object.keys(cache).length;
    }

    moveFunctions(f, memF);

    return memF;
}

function getFromCache(value) {
    if (!isNumeric(value)) {
        alert("Введенное значение не число!")
        return;
    }
    let cacheValue = variantF.getPrecalculatedValue(parseFloat(value));
    alert(cacheValue ? `Значение функции в ${value} равно ${cacheValue} ` : "Значение не найдено");
}

function getCacheSize() {
    return variantF.getCacheSize();
}

function debug(f) {
    function debugF() {
        let time = new Date();
        let result = f.apply(this, arguments);
        console.log(`x: ${arguments[0].toFixed(3)}. y: ${result.toFixed(3)}.\n${time}`)
        return result;
    }

    moveFunctions(f, debugF);

    return debugF;
}

function saveCallsCount(f) {
    let callsCount = 0;

    function saveCallsF() {
        callsCount++;
        return f.apply(this, arguments);
    }

    saveCallsF.getCallsCount = function () {
        return callsCount;
    }

    saveCallsF.resetCallsCount = function () {
        callsCount = 0;
    }

    moveFunctions(f, saveCallsF);

    return saveCallsF;
}

function getCallsCount() {
    return variantF.getCallsCount()
}

function moveFunctions(source, recipient) {
    for (let func in source) {
        recipient[func] = source[func];
    }
}

function calculateCharacteristics(characteristics, a, b, h) {
    let array = [];
    for (let x = a; x < b + h / 2; x += h) {
        array.push({x: x, y: variantF(x)});
    }
    return characteristics.map((characteristic) => characteristic(array));
}

function printCallCount() {
    let resultContainer = document.getElementById("result");
    let div = document.createElement("div");
    div.className = "panel";
    let count = getCallsCount();
    div.append(`Количество вызовов: ${count}`);
    resultContainer.append(div);

}

function start() {
    isMemoize = false;
    isDebug = false;
    isSaveCallsCount = false;

    let a = document.getElementById("a").value;
    let b = document.getElementById("b").value;
    let h = document.getElementById("h").value;

    if (!checkRange(a, b, h)) {
        return;
    }

    let f = getFunction(document.getElementById("characteristics").radio.value);
    let characteristics = getCharacteristics();
    variantF = getVariantF(f);
    let result = calculateCharacteristics(characteristics, parseFloat(a), parseFloat(b), parseFloat(h));
    printResult(result);

    document.getElementById("memoizeContainer").hidden = !isMemoize;
    if (isSaveCallsCount) {
        printCallCount();
    }

    if (isMemoize) {
        document.getElementById("cashSize").innerText = "Всего значений: " + getCacheSize();
    }

    let resultRow = document.getElementById("resultRow");
    resultRow.hidden = false;
}

function checkRange(a, b, h) {
    if (!isNumeric(a)) {
        window.alert("Начало интервала не число!");
        return false;
    }
    if (!isNumeric(b)) {
        window.alert("Конец интервала не число!");
        return false;
    }
    if (!isNumeric(h)) {
        window.alert("Шаг интервала не число!");
        return false;
    }
    if (parseFloat(h) <= 0) {
        window.alert("Шаг интервала не положительное число!")
        return false;
    }
    if (parseFloat(b) < parseFloat(a)) {
        window.alert("Конец интервала меньше начала интервала!");
        return false;
    }
    if (parseFloat(h) > parseFloat(b) - parseFloat(a)) {
        window.alert("Шаг интервала больше самого интервала!");
        return false;
    }
    return true;
}

function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

function printResult(result) {
    let resultContainer = document.getElementById("result");
    resultContainer.innerText = "";
    result.forEach((item) => {
        let div = document.createElement("div");
        div.className = "panel";
        div.append(resultItemToString(item));
        resultContainer.append(div);
    });
}

function resultItemToString(item) {
    let name = item.name;
    if (name === "average") {
        return `Среднее значение: ${item.value}`
    }
    if (name === "nullCount") {
        return `Количество точек разрыва: ${item.value}`
    }
    if (name === "monotonicIncreasing") {
        return `Функция монотонно-возрастающая: ${item.value}`;
    }
}

function getVariantF(f) {
    let variantF = f;
    isMemoize = document.getElementById("memoize").checked;
    isDebug = document.getElementById("debug").checked;
    isSaveCallsCount = document.getElementById("saveCallsCount").checked;
    if (isMemoize) {
        variantF = memoize(variantF);
    }
    if (isDebug) {
        variantF = debug(variantF);
    }
    if (isSaveCallsCount) {
        variantF = saveCallsCount(variantF);
    }
    return variantF;
}

function getCharacteristics() {
    let characteristics = [];

    let isAvgCharacteristic = document.getElementById("avg").checked;
    let isNullValuesCharacteristic = document.getElementById("nullCount").checked;
    let isFunctionIncreasingCharacteristic = document.getElementById("isIncreasing").checked;
    if (isAvgCharacteristic) {
        characteristics.push(getAverage);
    }
    if (isNullValuesCharacteristic) {
        characteristics.push(getUndefinedValuesCount);
    }
    if (isFunctionIncreasingCharacteristic) {
        characteristics.push(isMonotonicIncreasing)
    }
    return characteristics;
}

function getFunction(name) {
    if (name === "f1") {
        return f1;
    }
    if (name === "f2") {
        return f2;
    }
    if (name === "f3") {
        return f3;
    }
}

function getAverage(f) {
    let sum = 0;
    for (let i = 0; i < f.length; i++) {
        if (!isNaN(f[i].y)) {
            sum += f[i].y;
        }
    }
    return {name: "average", value: sum / f.length};
}

function getUndefinedValuesCount(f) {
    let counter = 0;
    for (let i = 0; i < f.length; i++) {
        if (isNaN(f[i].y) || f[i].y === Infinity || f[i].y === -Infinity || f[i].y === +Infinity) {
            counter++;
        }
    }
    return {name: "nullCount", value: counter};
}

function isMonotonicIncreasing(f) {
    let isMonotonicIncreasing = true;
    for (let i = 0; i < f.length - 1; i++) {
        if (f[i + 1].y < f[i].y) {
            isMonotonicIncreasing = false;
        }
    }
    return {
        name: "monotonicIncreasing", value: isMonotonicIncreasing
    }
}

function changeParameters() {
    let resultRow = document.getElementById("resultRow");
    resultRow.hidden = true;
}