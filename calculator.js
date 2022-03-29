var answer = document.getElementById("answer");
var buttons = [ "1/x", "x^2", "sqrt(x)", "/", 7, 8, 9, "*", 4, 5, 6, "-", 1, 2, 3, "+", "C", 0, ".", "=" ];

var calc = document.getElementById("calculator");
for (var button of buttons) {
    calc.innerHTML += `<button onclick="add('${button}')">${button}</button>`;
}

var curr_num = 0;
var new_num = NaN;
var operator = '';

var being_edited = false;

function add(val) {
    let num = parseInt(val);

    if (val === '1/x') {
        curr_num = 1 / curr_num;
    } else if (val === 'C') {
        curr_num = 0;
        new_num = NaN;
        operator = '';
    } else if (num || num === 0) {
        if (operator) {
            if (!new_num) {
                new_num = 0;
            }
            new_num = new_num * 10 + num;
        } else {
            if (!being_edited) {
                curr_num = 0;
            }
            curr_num = curr_num * 10 + num;
            being_edited = true;
        }
    } else if (val === 'x^2') {
        curr_num *= curr_num;
    } else if (val === 'sqrt(x)') {
        curr_num = Math.sqrt(curr_num);
    } else {
        if (new_num || new_num === 0) {
            curr_num = evaluate(curr_num, new_num, operator);

            new_num = NaN;
            being_edited = false;
        }
        operator = val !== '=' ? val : '';
    }
    update();
}

function evaluate(num1, num2, operator) {
    switch (operator) {
        case '/':
            return num1 / num2;
        case '*':
            return num1 * num2;
        case '-':
            return num1 - num2;
        case '+':
            return num1 + num2;
    }
}

function update() {
    var n = curr_num;
    if (new_num || new_num === 0) {
        n = new_num;
    }

    var op = "&nbsp;";
    if (operator) {
        op = operator;
    }

    answer.innerHTML = `${n}&nbsp;${op}&nbsp;`;
}