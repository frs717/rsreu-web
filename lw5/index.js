let V;

function countWords() {
    V = [];
    let body = document.getElementById('body');

    let M1size1 = parseInt(document.getElementById("M1size1").value);
    let M1size2 = parseInt(document.getElementById("M1size2").value);
    let M2size1 = parseInt(document.getElementById("M2size1").value);
    let M2size2 = parseInt(document.getElementById("M2size2").value);
    let minLength = parseInt(document.getElementById("minLength").value);
    let maxLength = parseInt(document.getElementById("maxLength").value);

    body.appendChild(generateTextBlock("M1 size = " + M1size1 + " x " + M1size2));
    body.appendChild(generateTextBlock("M2 size = " + M2size1 + " x " + M2size2));
    body.appendChild(generateTextBlock("Word length = " + minLength + " - " + maxLength));
    if (M1size1 <= 0 || M1size2 <= 0 || M2size1 <= 0 || M2size2 <= 0 || minLength <= 0 || minLength > maxLength) {
        body.appendChild(generateTextBlock("Incorrect values"));
        return;
    }

    let M1 = generateArrays(M1size1, M1size2, minLength, maxLength);
    let M2 = generateArrays(M2size1, M2size2, minLength, maxLength);
    body.appendChild(generateTextBlock("M1 array"));
    body.appendChild(generateTableFromDoubleArray(M1, M1size1, M1size2));
    body.appendChild(generateTextBlock("M2 array"));
    body.appendChild(generateTableFromDoubleArray(M2, M2size1, M2size2));

    let counter = 0;
    counter += countWordInDoubleArray(M1);
    counter += countWordInDoubleArray(M2);
    body.appendChild(generateTextBlock("V array"));
    if (V.length !== 0) {
        body.appendChild(generateTableFromArray(V));
    } else {
        body.appendChild(generateTextBlock("V is empty"));
    }

    let minElement = findMinElement(V);
    let maxElement = findMaxElement(V);
    body.appendChild(generateTextBlock("min = " + minElement));
    body.appendChild(generateTextBlock("max = " + maxElement));
    V.splice(V.indexOf(minElement), 1);
    V.splice(V.indexOf(maxElement), 1);

    body.appendChild(generateTextBlock("V array after modification"));
    if (V.length !== 0) {
        body.appendChild(generateTableFromArray(V));
    } else {
        body.appendChild(generateTextBlock("V is empty"));
    }

    body.appendChild(generateTextBlock("count = " + counter));
}

function generateArrays(size1, size2, minLength, maxLength) {

    let array = new Array(size1);
    for (let i = 0; i < size1; i++) {
        array[i] = new Array(size2);
        for (let j = 0; j < size2; j++) {
            array[i][j] = generateRandomString(minLength, maxLength);
        }
    }
    return array;
}

function generateRandomString(minLength, maxLength) {
    let possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let string = "";
    let size = Math.random() * (maxLength - minLength) + minLength;
    for (let i = 0; i < size; i++)
        string += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    return string;
}

function countWordInDoubleArray(doubleArray) {
    let counter = 0;
    doubleArray.forEach(function (item) {
        counter += countWordInArray(item);
    })
    return counter;
}


function countWordInArray(array) {
    let counter = 0;
    array.forEach(function (item) {
        if (item.charAt(0).toLowerCase() === item.charAt(item.length - 1).toLowerCase()) {
            counter++;
            saveItem(item);
        }
    });
    return counter;
}

function saveItem(item) {
    V.push(item);
}

function findMinElement(array) {
    let min = array[0];
    array.forEach(function (item) {
        if (item < min) {
            min = item;
        }
    })
    return min;
}

function findMaxElement(array) {
    let max = array[0];
    array.forEach(function (item) {
        if (item > max) {
            max = item;
        }
    })
    return max;
}

function generateTableFromDoubleArray(array, size1, size2) {
    let table = document.createElement("table");
    let tbody = document.createElement("tbody");
    tbody.setAttribute('id', 'tbody');
    table.appendChild(tbody);

    for (let i = 0; i < size1; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < size2; j++) {
            let cell = document.createElement("td");
            row.appendChild(cell);
            tbody.appendChild(row);
            table.rows[i].cells[j].innerText = array[i][j];
        }
    }
    table.setAttribute("name", "output");
    return table;
}

function generateTableFromArray(array) {
    let table = document.createElement("table");
    let tbody = document.createElement("tbody");
    tbody.setAttribute('id', 'tbody');
    table.appendChild(tbody);

    for (let i = 0; i < array.length; i++) {
        let row = document.createElement("tr");
        let cell = document.createElement("td");
        row.appendChild(cell);
        tbody.appendChild(row);
        table.rows[i].cells[0].innerText = array[i];
    }
    table.setAttribute("name", "output");
    return table;
}

function generateTextBlock(text) {
    let div = document.createElement("div");
    div.innerHTML = "<b>" + text + "<b>";
    div.setAttribute("name", "output");
    return div;
}
