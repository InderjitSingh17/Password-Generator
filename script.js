
// Handel Password Length & Password Range

const PasswordNumber = document.querySelector(".display-password-Length");
const PasswordRange = document.querySelector(".range-length");

let PasswordLength = 7;

function handelPasswordLength() {
    PasswordNumber.innerHTML = PasswordLength;
    PasswordRange.value = PasswordLength
}
handelPasswordLength()

PasswordRange.addEventListener('input', function (e) {
    PasswordLength = e.target.value
    handelPasswordLength()
});


// Gernate Random Integer minimum And Maximum Value

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

// Get Upper Case

function getUpperCase() {
    return String.fromCharCode(getRandomInteger(65, 91));
}

// Get Lower Case

function getLowerCase() {
    return String.fromCharCode(getRandomInteger(97, 123));
}

// Get Number

function getNumber() {
    return getRandomInteger(0, 9);
}

// Get Symbel

let symbel = '~`!@#$%^&*()-_+=,</?.>";:]}{['
function getSymbel() {
    let symbelValue = getRandomInteger(0, symbel.length);
    return symbel.charAt(symbelValue);
}

// Set Strength color 

let strength = document.querySelector(".strength")

function setStrengthColor(color) {
    strength.style.backgroundColor = color
}

// CalcuLate Strength & Color

let UpperCase = document.querySelector(".UpperCase");
let LowerCase = document.querySelector(".LowerCase");
let NumberCase = document.querySelector(".NumberCase");
let symbelCase = document.querySelector(".SymbelCase");

function CalcuLateStrengthColor() {
    let upper = false;
    let lower = false;
    let number = false;
    let symb = false;

    if (UpperCase.checked) {
        upper = true
    }
    else {
        upper = false
    }

    if (LowerCase.checked) {
        lower = true
    }
    else {
        lower = false
    }

    if (NumberCase.checked) {
        number = true
    }
    else {
        number = false
    }

    if (symbelCase.checked) {
        symb = true
    }
    else {
        symb = false
    }

    if (UpperCase && LowerCase && (NumberCase || symbelCase) && PasswordLength >= 8) {
        setStrengthColor('#228B22');
        strength.innerHTML = 'Good Password'
        strength.style.color = 'white';
    }
    else if ((UpperCase || LowerCase) && (NumberCase || symbelCase) && PasswordLength <= 7) {
        setStrengthColor('#FF0000');
        strength.innerHTML = 'Week Password';
        strength.style.color = 'white';
    }
}


// Copy Contant 

let PasswordDisplay = document.querySelector(".PasswordDisplay");
let copyBtn = document.querySelector(".copy")

async function copyContant() {
    try {
        await navigator.clipboard.writeText(PasswordDisplay.value);
        setStrengthColor("#FFAA1D")
        strength.innerHTML = 'Copy Contant';

    }
    catch (e) {
        setStrengthColor("#607D8B")
        strength.innerHTML = 'Copy FAILED';
    }
    setTimeout(() => {
        setStrengthColor("#aed3ef")
        strength.innerHTML = '';
    }, 2000);
}

copyBtn.addEventListener('click', function () {
    if (PasswordDisplay.value) {
        copyContant();
    }
    else {
        console.log('Sorry for copy');
    }
})


// Check Box Count

let count = 0;

let allCheckBox = document.querySelectorAll(".check-box");

function handelCheckBoxChange() {
    count = 0;
    allCheckBox.forEach(function (checkBox) {
        if (checkBox.checked) {
            count++;
        }
    });

    if (PasswordLength < count) {
        PasswordLength = count;
        handelPasswordLength();
    }
}

allCheckBox.forEach(function (checkBox) {
    checkBox.addEventListener('change', handelCheckBoxChange);
})

// shufflePassword

function shufflePassword(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

// Gernate BTN 

let PASSWORD = "";

let GernateBTN = document.querySelector(".BTN");

GernateBTN.addEventListener('click', function () {
    if (count = 0) {
        return
    }

    if (PasswordLength < count) {
        PasswordLength = count;
        handelPasswordLength();
    }

    PASSWORD = "";

    let functionArr = [];

    if (UpperCase.checked) {
        functionArr.push(getUpperCase);
    }
    if (LowerCase.checked) {
        functionArr.push(getLowerCase);
    }
    if (NumberCase.checked) {
        functionArr.push(getNumber);
    }
    if (symbelCase.checked) {
        functionArr.push(getSymbel);
    }

    for (let i = 0; i < functionArr.length; i++) {
        PASSWORD += functionArr[i]();
    }

    for (let i = 0; i < PasswordLength - functionArr.length; i++) {
        let random = getRandomInteger(0, functionArr.length);
        PASSWORD += functionArr[random]();
    }

    PASSWORD = shufflePassword(Array.from(PASSWORD));

    PasswordDisplay.value = PASSWORD;

    CalcuLateStrengthColor();

})
