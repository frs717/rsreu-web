function F(x, y, a, nm1, nm2) {
    let sum = 0;
    if (x <= a * y) {
        for (let i = 1; i < nm1; i++) {
            sum += (y * factorial(i) + x) / (4 * a - x);
        }
    } else {
        for (let i = 0; i < nm2; i++) {
            sum += (x - y) / (factorial(i + 1) + y);
        }
    }
    return sum;
}

function factorial(x) {
    if (x === 0) {
        return 1;
    }
    return x * factorial(x - 1);
}

function isInteger(num) {
    num = parseFloat(num);
    return (num ^ 0) === num;
}

function tab() {
    let a = document.getElementById('a').value;
    let nm1 = document.getElementById('nm1').value;
    let nm2 = document.getElementById('nm2').value;
    let x0 = document.getElementById('x0').value;
    let xn = document.getElementById('xn').value;
    let y0 = document.getElementById('y0').value;
    let yn = document.getElementById('yn').value;
    let stepX = document.getElementById('stepX').value;
    let stepY = document.getElementById('stepY').value;
    let rez = document.getElementById("result");
    x0 = parseFloat(x0);
    xn = parseFloat(xn);
    y0 = parseFloat(y0);
    yn = parseFloat(yn);
    stepX = parseFloat(stepX);
    stepY = parseFloat(stepY);

    if (((x0 > xn && stepX < 0) || (x0 < xn && stepX > 0)) && ((y0 > yn && stepY < 0) || (y0 < yn && stepY > 0)) &&
        nm1 >= 2 && nm1 <= 6 && nm2 >= 2 && nm2 <= 6 && isInteger(nm1) && isInteger(nm2)) {
        let minF;
        let maxF;
        let f;

        let s = "<table width='600'>";
        s += "<tr><td> x </td><td> y </td><td> f(x, y) </td></tr>";
        for (let i = x0; x0 < xn ? i < xn + stepX * 0.5 : i > xn + stepX * 0.5; i += stepX) {
            for (let j = y0; y0 < yn ? j < yn + stepY * 0.5 : j > yn + stepY * 0.5; j += stepY) {
                f = F(i, j, a, nm1, nm2);
                if (i === x0 & j === y0 || minF > f) {
                    minF = f;
                }
                if (i === x0 & j === y0 || maxF < f) {
                    maxF = f;
                }
                s += "<tr><td>" + i + "</td><td>" + j + "</td><td>" + f + "</td></tr>";
            }
        }
        s += "</table>";
        s += "MinF = " + minF + " MaxF = " + maxF;
        rez.innerHTML += s;
    } else {
        rez.innerHTML = "Ошибка! C такими значениями нельзя табулировать функцию<br>";
        alert("Incorrect input");
    }
}
