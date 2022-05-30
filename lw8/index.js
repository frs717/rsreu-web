let currentVector = null;
let additionalVector = null;
let N;

function executeCommand() {
    let action = document.getElementById("actionSelect").value;
    clearOutput();
    if (currentVector == null) {
        alert("Основной вектор не введен");
        return new Error("Vector is empty");
    }
    switch (action) {
        case "getCoords":
            output(currentVector.getCoords());
            break;
        case "getVectorLength":
            output(currentVector.getVectorLength());
            break;
        case "calculateScalarMul":
            if (additionalVector == null) {
                alert("Дополнительный вектор не введен");
                return new Error("Vector is empty");
            }
            output(currentVector.calculateScalarMul(additionalVector));
            break;
        case "addVector":
            if (additionalVector == null) {
                alert("Дополнительный вектор не введен");
                return new Error("Vector is empty");
            }
            output(currentVector.addVector(additionalVector).toString());
            break;
        case "mulByNumber":
            let number = parseFloat(document.getElementById("number").value);
            if (!isNumeric(number)) {
                alert("Некорретно введено число");
                return new Error("Incorrect input number");
            }
            output(currentVector.mulByNumber(number).toString());
            break;
        case "mulVectorByComponents":
            if (additionalVector == null) {
                alert("Дополнительный вектор не введен");
                return new Error("Vector is empty");
            }
            output(currentVector.mulVectorByComponents(additionalVector).toString());
            break;
    }

    document.getElementById("output").hidden = false;
}

function drop() {
    currentVector = null;
    additionalVector = null;
    N = null;
    document.getElementById("init").hidden = false;
    document.getElementById("setting").hidden = true;
    document.getElementById("additionalVectorInput").hidden = true;
    document.getElementById("vectorPoints").hidden = true;
    document.getElementById("output").hidden = true;
    document.getElementById("vectorOutput").hidden = true;


}

function outputLogs() {
    currentVector.logActions();
}

function clearLogs() {
    currentVector.clearActions();
}

function onChangeActionSelect() {
    clearOutput();
    document.getElementById("inputNumber").hidden = document.getElementById("actionSelect").value !== "mulByNumber";
}

function clearOutput() {
    document.getElementById("output").textContent = "";

}

function output(text) {
    document.getElementById("output").textContent = text;

}


function start() {
    N = parseInt(document.getElementById("vectorN").value);
    document.getElementById("init").hidden = true;
    createVectorPointsInputs(N);
    createAdditionalVectorPointsInputs(N);
    document.getElementById("setting").hidden = false;
}

function outputVector() {
    document.getElementById("vectorOutput").hidden = false;
    document.getElementById("vector").textContent = currentVector != null ? currentVector.toString() : "Вектор не введен";
    document.getElementById("additionalVector").textContent = additionalVector != null ? additionalVector.toString() : "Вектор не введен";
    document.getElementById("additionalVectorOutput").hidden = false;
}

function fillVector() {
    let coords = [];
    for (let i = 0; i < N; i++) {
        if (!isNumeric(document.getElementById("coord" + i).value)) {
            alert("Введите корректные значения")
            return new Error("Incorrect input");
        }
        coords.push(parseFloat(document.getElementById("coord" + i).value));
    }
    currentVector = new Vector(N, coords);
    outputVector();
}

function fillAdditionalVector() {
    let coords = [];
    for (let i = 0; i < N; i++) {
        if (!isNumeric(document.getElementById("additionalCoord" + i).value)) {
            alert("Введите корректные значения")
            return new Error("Incorrect input");
        }
        coords.push(parseFloat(document.getElementById("additionalCoord" + i).value));
    }
    additionalVector = new Vector(N, coords);
    outputVector();
}

function createVectorPointsInputs(n) {
    document.getElementById("vectorPoints").hidden = false;


    let tr = document.getElementById("vectorCoords");
    while (tr.firstChild) {
        tr.removeChild(tr.firstChild);
    }

    for (let i = 0; i < n; i++) {
        let td = document.createElement("td");
        td.textContent = "coord" + i + " ";
        let input = document.createElement("input");
        input.id = "coord" + i;
        input.type = "number";
        td.append(input);
        tr.append(td);
    }
}

function createAdditionalVectorPointsInputs(n) {
    document.getElementById("additionalVectorInput").hidden = false;
    let tr = document.getElementById("additionalVectorCoords");
    while (tr.firstChild) {
        tr.removeChild(tr.firstChild);
    }

    for (let i = 0; i < n; i++) {
        let td = document.createElement("td");
        td.textContent = "additionalCoord" + i + " ";
        let input = document.createElement("input");
        input.id = "additionalCoord" + i;
        input.type = "number";
        td.append(input);
        tr.append(td);
    }
}

function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

//////////////////////////////////////////////////////////////

function Vector(n, coords) {
    this.n = n;
    this.coords = coords.length === n ? coords : [];

    this.toString = () => {
        this.registerAction("toString");
        return "Vector " + getString(this.coords);
    }

    this.setCoords = (points) => {
        this.registerAction("setCoords", points);
        if (points.length !== this.n) {
            return new Error("Coords count not equal vector dimension");
        }
        this.coords = points;
        return this;
    }

    this.getCoords = () => {
        this.registerAction("getCoords");
        return this.coords;
    }

    this.getVectorLength = () => {
        this.registerAction("getVectorLength");
        return Math.sqrt(this.coords.reduce((previousValue, currentValue) => previousValue + Math.pow(currentValue, 2), 0));
    }

    this.mulByNumber = (number) => {
        this.registerAction("mulByNumber", number);
        let temp = this.coords.map((item) => item * number);
        return new Vector(this.n, temp);
    }

    this.calculateScalarMul = (vector) => {
        this.registerAction("calculateScalarMul", vector);
        if (vector.n !== this.n) {
            return new Error("Different vector dimensions");
        }
        let temp = [];
        for (let i = 0; i < this.n; i++) {
            temp.push(this.coords[i] * vector.coords[i]);
        }
        return temp.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    }

    this.addVector = (vector) => {
        this.registerAction("addVector", vector);
        if (vector.n !== this.n) {
            return new Error("Different vector dimensions");
        }
        let temp = [];
        for (let i = 0; i < this.n; i++) {
            temp.push(this.coords[i] + vector.coords[i]);
        }
        return new Vector(this.n, temp);
    }

    this.mulVectorByComponents = (vector) => {
        this.registerAction("mulVectorByComponents", vector);
        if (vector.n !== this.n) {
            return new Error("Different vector dimensions");
        }
        let temp = [];
        for (let i = 0; i < this.n; i++) {
            temp.push(this.coords[i] * vector.coords[i]);
        }
        return new Vector(this.n, temp);
    }

    function getString(point) {
        let string = "(";
        for (let i = 0; i < point.length; i++) {
            if (i > 0) {
                string += ", ";
            }
            string += point[i];
        }
        string += ")";
        return string;
    }

}


Vector.prototype.actions = [];

Vector.prototype.registerAction = (functionName, arg) => {
    Vector.prototype.actions.push({
        "function": functionName,
        "time": JSON.stringify(new Date()),
        "args": arg
    });
};

Vector.prototype.clearActions = () => {
    Vector.prototype.actions.length = 0;
};

Vector.prototype.logActions = () => {
    console.log(Vector.prototype.actions);
};