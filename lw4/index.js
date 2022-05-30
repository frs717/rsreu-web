let table = document.createElement("table");
let isBuild = false;
let isDelete = false;
let newSize;
let average;

function buildTable() {
    let size = parseInt(document.getElementById("size").value);
    if (size <= 0 || size > 50) {
        alert('Incorrect input');
        return;
    }
    table.remove();
    table = document.createElement("table");
    let tbody = document.createElement("tbody");
    tbody.setAttribute('id', 'tbody');
    table.appendChild(tbody);

    for (let i = 0; i < size; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < size; j++) {
            let cell = document.createElement("td");
            row.appendChild(cell);
            tbody.appendChild(row);
        }
    }

    let body = document.getElementById('body');
    body.appendChild(table);

    let amount = 0;
    let sum = 0;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (i === j || i === size - 1 - j || j === 0 || j === size - 1) {
                table.rows[i].cells[size - 1 - j].innerText = (i + 1).toString();
                amount++;
                sum += i + 1;
                table.rows[i].cells[size - 1 - j].style.backgroundColor = 'aqua';
            } else if (i < size / 2) {
                if (j < i || size - 1 - j < i) {
                    table.rows[i].cells[size - 1 - j].style.backgroundColor = 'red';
                }
            } else {
                if (j < size - 1 - i || size - 1 - j < size - 1 - i) {
                    table.rows[i].cells[size - 1 - j].style.backgroundColor = 'red';
                }
            }
        }
        average = sum / amount;
        isBuild = true;
        isDelete = false;
    }


}

function deleteRows() {
    if (isBuild) {
        let value = parseInt(document.getElementById("value").value);
        for (let i = table.rows.length - 1; i >= 0; i--) {
            if (sumRow(i) > value) {
                table.deleteRow(i);
            }
        }
        isDelete = true;
    } else {
        alert('First build!');
    }

}

function sumRow(rowIndex) {
    let size = parseInt(document.getElementById("size").value);
    let sum = 0;
    for (let i = 0; i < size; i++) {
        sum = sum + Number(table.rows[rowIndex].cells[i].innerText);
    }
    return sum;
}

function transform() {
    if (isBuild) {
        let size = table.rows.length;
        for (let i = table.rows.length - 1; i >= Math.ceil(size / 2); i--) {
            table.deleteRow(i);
        }

        let tbody = document.getElementById("tbody");

        newSize = 2 * Math.ceil(size / 2);

        for (let i = 0; i < newSize / 2; i++) {
            let row = document.createElement("tr");
            for (let j = 0; j < table.rows[i].cells.length; j++) {
                let cell = document.createElement("td");
                row.appendChild(cell);
                tbody.appendChild(row)

            }
        }

        for (let i = newSize / 2; i < newSize; i++) {
            for (let j = 0; j < table.rows[i].cells.length; j++) {
                table.rows[i].cells[j].innerText = table.rows[newSize - 1 - i].cells[j].innerText;
                table.rows[i].cells[j].style.backgroundColor = table.rows[newSize - 1 - i].cells[j].style.backgroundColor;
            }
        }

    } else {
        alert('First build!');
    }

}

function setAverage() {
    if (isBuild) {
        let color;
        if (document.getElementById('radioRed').checked) {
            color = 'red';
        } else {
            color = 'aqua';
        }

        for (let i = 0; i < table.rows.length; i++) {
            for (let j = 0; j < table.rows[i].cells.length; j++) {
                if (table.rows[i].cells[j].style.backgroundColor === color) {
                    table.rows[i].cells[j].innerText = average;
                }
            }
        }
    } else {
        alert('First build!');
    }

}
