let students = [];

const lastNames = ["Иванов", "Белов", "Петров"];
const firstNames = ["Иван", "Алексей", "Дмитрий"];
const secondNames = ["Иванович", "Алексеевич", "Андреевич"];
const subjects = ["Математика", "Информатика", "Электроника"];


function generateStudents(n) {
    if (!isNumeric(n)) {
        window.alert("Введеное значение количества сотрудников не число!");
        document.getElementById("n").value = students.length;
        return;
    }
    if (!isInteger(n)) {
        window.alert("Введеное значение количества сотрудников не целое число!");
        document.getElementById("n").value = students.length;
        return;
    }
    if (n < 1) {
        window.alert("Введеное значение количества сотрудников меньше 1!");
        document.getElementById("n").value = students.length;
        return;
    }
    if (n > 50) {
        window.alert("Введеное значение количества сотрудников больше 50!");
        document.getElementById("n").value = students.length;
        return;
    }

    students = [];
    for (let i = 0; i < n; i++) {
        let employee = generateStudent();
        students.push(employee);
    }
    updateTable(students);
}

function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

function isInteger(value) {
    return (value % 1 === 0);
}

function generateStudent() {
    function arrayRandElement(arr) {
        let rand = Math.floor(Math.random() * arr.length);
        return arr[rand];
    }

    function getRandomValue(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomPhone() {
        return `7 (${getRandomValue(100, 999)}) ${getRandomValue(100, 999)} ${getRandomValue(10, 99)} ${getRandomValue(10, 99)}`;
    }

    function generateSubjectList() {
        let marks = [];
        let size = getRandomValue(1, subjects.length);
        for (let i = 0; i < size; i++) {
            let mark = generateMark();
            marks.push(mark);
        }
        return marks;
    }

    function generateMark() {
        return {
            subject: arrayRandElement(subjects),
            mark: getRandomValue(2, 5)
        }
    }

    return {
        fullName: {
            firstName: arrayRandElement(firstNames),
            secondName: arrayRandElement(secondNames),
            lastName: arrayRandElement(lastNames)
        }, receiptDate: new Date(getRandomValue(1980, 2001), getRandomValue(1, 12), getRandomValue(0, 28))
        , phoneNumber: getRandomPhone(),
        subjectList: generateSubjectList()

    }
}

function updateTable(employees) {
    let table = document.getElementById("studentsTable");
    printTable(table, employees);
}

function printTable(container, students) {
    container.innerText = "";
    if (students.length === 0) {
        container.append("Студентов нет");
        return;
    }
    let tableBody = document.createElement("tbody");

    let isIncludeAverageMark = students.some((student) => student.hasOwnProperty("averageMark"));
    tableBody.append(getHeadRow(isIncludeAverageMark));
    tableBody.append(getDetailedHeadRow());
    students.forEach(employee => {
        tableBody.append(getRow(employee, isIncludeAverageMark))
    })
    container.append(tableBody);
}

function getHeadRow(isIncludeAverageMark) {
    function appendFullName(row) {
        let cell = document.createElement("th");
        cell.colSpan = 3;
        cell.textContent = "Полное имя";
        row.append(cell);
    }

    function appendBirthDate(row) {
        let cell = document.createElement("th");
        cell.rowSpan = 2;
        cell.textContent = "Дата поступления";
        row.append(cell);
    }

    function appendPhoneNumber(row) {
        let cell = document.createElement("th");
        cell.rowSpan = 2;
        cell.textContent = "Номер телефона";
        row.append(cell);
    }

    function appendAverageMark(row) {
        let cell = document.createElement("th");
        cell.rowSpan = 2;
        cell.textContent = "Средний балл";
        row.append(cell);
    }

    function appendSubjectList(row) {
        let cell = document.createElement("th");
        cell.rowSpan = 2;
        cell.textContent = "Оценки";
        row.append(cell);
    }


    let row = document.createElement("tr");
    appendFullName(row);
    appendBirthDate(row);
    appendPhoneNumber(row);
    if (isIncludeAverageMark) {
        appendAverageMark(row)
    }
    appendSubjectList(row);
    return row;
}

function getDetailedHeadRow() {
    function appendFullName(row) {
        let cell = document.createElement("th");
        cell.textContent = "Фамилия"
        row.append(cell);
        cell = document.createElement("th");
        cell.textContent = "Имя"
        row.append(cell);
        cell = document.createElement("th");
        cell.textContent = "Отчество"
        row.append(cell);
    }


    let row = document.createElement("tr");
    appendFullName(row);
    return row;
}

function getRow(student, isIncludeAverage) {
    function appendFullName(row, fullName) {
        let cell = document.createElement("td");
        cell.textContent = fullName.lastName;
        row.append(cell);
        cell = document.createElement("td");
        cell.textContent = fullName.firstName;
        row.append(cell);
        cell = document.createElement("td");
        cell.textContent = fullName.secondName;
        row.append(cell);
    }

    function appendBirthDate(row, birthDate) {
        const getTwoDigitNumber = (number) => {
            if (number.toString().length === 1) {
                return `0${number}`;
            } else {
                return number;
            }
        }

        let cell = document.createElement("td");
        if (birthDate) {
            cell.textContent = `${getTwoDigitNumber(birthDate.getDate())}.${getTwoDigitNumber(birthDate.getMonth() + 1)}.${birthDate.getFullYear()}`
        }
        row.append(cell);
    }

    function appendPhoneNumber(row, phoneNumber) {
        let cell = document.createElement("td");
        cell.textContent = phoneNumber;
        row.append(cell);
    }

    function appendAverageMark(row, average) {
        let cell = document.createElement("td");
        cell.textContent = average;
        row.append(cell);
    }

    function appendSubjectList(row, subjectList) {
        let cell;
        for (let i = 0; i < subjectList.length; i++) {
            cell = document.createElement("td");
            cell.textContent = subjectList[i].subject;
            row.append(cell);
            cell = document.createElement("td");
            cell.textContent = subjectList[i].mark;
            row.append(cell);
        }
    }

    let row = document.createElement("tr");
    appendFullName(row, student.fullName);
    appendBirthDate(row, student.receiptDate);
    appendPhoneNumber(row, student.phoneNumber);
    if (isIncludeAverage) {
        appendAverageMark(row, student.averageMark);
    }
    appendSubjectList(row, student.subjectList);
    return row;
}

function calculateAverage(student) {
    let sum = 0;
    for (let i = 0; i < student.subjectList.length; i++) {
        sum += student.subjectList[i].mark;
    }
    return sum / student.subjectList.length;
}

function addAverage() {
    for (let i = 0; i < students.length; i++) {
        if (students[i].subjectList.length > 0) {
            students[i].averageMark = calculateAverage(students[i]);
        } else {
            students[i].averageMark = 0;
        }
    }
    updateTable(students);
}

function removeReceiptDateByYear(year) {
    if (!isNumeric(year)) {
        window.alert("Введеное значение года!");
        document.getElementById("minValue").value = "";
        return;
    }

    if (!isInteger(year)) {
        window.alert("Введеное значение года не целое число!");
        document.getElementById("minValue").value = "";
        return;
    }

    if (year < 0) {
        window.alert("Введеное значение года слишком маленькое!");
        document.getElementById("minValue").value = "";
        return;
    }

    for (let i = 0; i < students.length; i++) {
        if (students[i].receiptDate.getFullYear() > year) {
            delete students[i].receiptDate;
        }
    }
    updateTable(students);
}

function sortByAverageMark() {
    let isHasAverageMark = students.some((student) => student.hasOwnProperty("averageMark"));
    if (isHasAverageMark) {
        students.sort((a, b) => b.averageMark - a.averageMark);
        updateTable(students);
    } else {
        window.alert("Нет среднего балла");
    }
}

function uploadJSON() {
    navigator.clipboard.writeText(JSON.stringify(students, null, 4))
        .then(() => window.alert("JSON скопирован в буфер обмена"));
}

function loadJSON(str) {
    let oldStudents = students;
    try {
        students = JSON.parse(str, (key, value) => {
            if (key === "receiptDate") {
                return new Date(value);
            }
            return value;
        });
        try {
            updateTable(students);
            n.value = students.length;
        } catch (e) {
            window.alert("JSON не соответствует программе")
            students = oldStudents;
            updateTable(students);
        }
    } catch (e) {
        window.alert("Во время десериализации произошла ошибка")
    }
}