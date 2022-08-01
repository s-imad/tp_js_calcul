// IIFE
(function () {

    const listNumbers = document.querySelectorAll("button:not(.operator):not(.equalSign)");
    const listOperators = document.querySelectorAll("button.operator");
    const listOptions = document.querySelectorAll("span.action");
    const resultElem = document.getElementById("inner-result");

    const quitButton = document.getElementsByClassName("quit")[0];
    const reduceButton = document.getElementsByClassName("reduce")[0];
    const increaseButton = document.getElementsByClassName("increase")[0];

    const equalSign = document.getElementsByClassName("equalSign")[0];

    let firstNumber = "";
    let currentOperator = "";
    let secondNumber = "";
    let result = 0;

    // DIFFERENTS CALCULS DISPONIBLES
    const calcul = {
        "x": function (a, b) { return (a * b).toFixed(2) },
        "-": function (a, b) { return (a - b).toFixed(2) },
        "+": function (a, b) { return (a + b).toFixed(2) },
        "%": function (a, b) { return (a % b).toFixed(2) },
        "/": function (a, b) { return (a / b).toFixed(2) },
    }

    // ANIMATION ON HOVER
    // ANIMATION ON MOUSEOUT
    for (let i = 0; i < listOptions.length; i++) {
        listOptions[i].addEventListener("mouseover", function () {
            showOptions(this);
        });
        listOptions[i].addEventListener("mouseout", function () {
            hideOptions(this);
        });
    }

    function showOptions(elemHTML) {
        elemHTML.children[0].classList.add("text-opacity");
    }

    function hideOptions(elemHTML) {
        elemHTML.children[0].classList.remove("text-opacity");
    }

    // QUIT
    quitButton.addEventListener("click", quit);

    function quit() {
        document.getElementById("calculatrice").style.display = "none";
    }

    // REDUCE
    reduceButton.addEventListener("click", reduce);

    function reduce() {
        document.getElementsByClassName("buttons")[0].classList.toggle("hide");
        reduceButton.style.display = "none";
        increaseButton.style.display = "block";
    }

    // INCREASE
    increaseButton.addEventListener("click", increase);

    function increase() {
        document.getElementsByClassName("buttons")[0].classList.toggle("hide");
        reduceButton.style.display = "block";
        increaseButton.style.display = "none";
    }

    // ANIMATION SUR LES BUTTONS ON CLICK
    for (let i = 0; i < listNumbers.length; i++) {
        listNumbers[i].addEventListener("click", function () {
            animationOnButtons(this);
            showValueOnScreen(this.innerHTML);
        });
    }

    for (let i = 0; i < listOperators.length; i++) {
        listOperators[i].addEventListener("click", function () {
            animationOnButtons(this);
            selectOperator(this.innerHTML);
        });
    }

    // CREER UNE ANIMATION QUAND UNE TOUCHE EST PRESSEE
    function animationOnButtons(button) {
        button.style.opacity = 0.6;

        setTimeout(function () {
            button.style.opacity = 1;
        }, 200)
    }

    // CALCUL
    function makeCalculation() {
        if (firstNumber != "" && currentOperator != "" && secondNumber != "") {
            result = calcul[currentOperator](parseFloat(firstNumber.replace(",", ".")), parseFloat(secondNumber.replace(",", ".")));
            resultElem.innerHTML = result;
            firstNumber = result.toString();
            secondNumber = "";
        }
    }

    // PERMET D'AFFICHER LES CHIFFRES TAPES
    function showValueOnScreen(value) {
        if (currentOperator == "") {
            firstNumber = checkStartingValue(firstNumber, value);
            resultElem.innerHTML = firstNumber;
        } else {
            if (firstNumber == ",") {
                firstNumber = "0";
            }
            secondNumber = checkStartingValue(secondNumber, value);
            resultElem.innerHTML = secondNumber;
        }
    }

    // VERIFICATION DES VALEURS INSEREES
    function checkStartingValue(number, value) {
        if (number == "0") {
            if (value == ",") {
                number += value;
                return number;
            }
            number = value;
            return number;
        } else if (number == ",") {
            number = "0" + number;
            return number;
        } else {
            number += value;
            return number;
        }
    }

    // SELECTION DE L'OPERATEUR
    function selectOperator(operator) {
        if (operator != "AC") {
            if (firstNumber != "," && secondNumber != ",") {
                makeCalculation();
            }
            currentOperator = operator;
        } else {
            reset();
        }
    }

    // RESET AVEC LE BOUTON AC
    function reset() {
        resultElem.innerHTML = "0";
        firstNumber = "";
        secondNumber = "";
        currentOperator = "";
    }

    // MAKE CALCULATION ON CLICK =
    equalSign.addEventListener("click", function () {
        if (firstNumber != "," && secondNumber != ",") {
            animationOnButtons(this);
            makeCalculation();
        }
    });


}())