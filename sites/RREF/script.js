var n = 3
const m11 = document.getElementById("input-11");
const m12 = document.getElementById("input-12");
const m13 = document.getElementById("input-13");
const m21 = document.getElementById("input-21");
const m22 = document.getElementById("input-22");
const m23 = document.getElementById("input-23");
const m31 = document.getElementById("input-31");
const m32 = document.getElementById("input-32");
const m33 = document.getElementById("input-33");
const rowop = document.querySelector("input[name=row_op]:checked");
const ROswitch = document.getElementById("switch");
const ROmult = document.getElementById("mult");
const ROmultadd = document.getElementById("mult-add");
const scalar = document.getElementById("scalar");
const rowi = document.getElementById("rowi");
const rowj = document.getElementById("rowj");
const calculateBtn = document.getElementById('calculateBtn');
const addBtn = document.getElementById('addBtn');
const addAnswer = document.getElementById('addAnswer');
const matrixDOM = [[m11, m12, m13], [m21, m22, m23], [m31, m32, m33]];
var actions = [];
var matrices = [];


// const matrix = [[m11, m12, m13]]

function toRational(numberString) {
if (!numberString.includes('/')) {
    return new Rational(numberString, 1)
}

let numberList = numberString.split('/')
return new Rational(numberList[0], numberList[1])
}

class Rational {
    constructor(a, b) {
        this.num = parseInt(a);
        this.den = parseInt(b);
        //console.log(this)
    }
    
    isInteger() {
        return this.den == 1;
    }

    isOne() {
        return this.num == this.den;
    }

    isNegativeOne() {
        return this.num == -this.den;
    }

    isZero() {
        return this.num == 0;
    }

    isPositive() {
        return this.num * this.den > 0;
    }

    isNegative() {
        return this.num * this.den < 0;
    }

    isUndefined() {
        return this.den == 0;
    }

    display() {
        if (this.isUndefined()) {
            return 'undefined'
        }

        if (this.isZero()) {
            return '0'
        }

        if (this.isOne()) {
            return '1'
        }

        if (this.isInteger()) {
            return this.num
        }

        var sign = ''
        if (this.isNegative()) {
            sign = '-'
        }

        return sign + Math.abs(this.num) + '/' + Math.abs(this.den);

    }

    one() {
        this.num = 1;
        this.den = 1;
    }

    zero() {
        this.num = 0;
        this.den = 1;
    }
    
    add(y) {
        var newNum = this.num * y.den + this.den * y.num;
        var newDen = this.den * y.den;
        var n = reduce(newNum, newDen);
        return new Rational(n[0], n[1]);
    }
    
    subtract(y) {
        var newNum = this.num * y.den - this.den * y.num;
        var newDen = this.den * y.den;
        var n = reduce(newNum, newDen);
        return new Rational(n[0], n[1]);
    }
    
    multiply(y) {
        var newNum = this.num * y.num;
        var newDen = this.den * y.den;
        var n = reduce(newNum, newDen);
        return new Rational(n[0], n[1]);
    }
    
    divide(y) {
        var newNum = this.num * y.den;
        var newDen = this.den * y.num;
        var n = reduce(newNum, newDen);
        return new Rational(n[0], n[1]);
    }
}

function reduce(numerator, denominator) {
    var a = parseInt(numerator);
    var b = parseInt(denominator);
    var c;
    while (b) {
        c = a % b; a = b; b = c;
    }
    return new Rational(numerator / a, denominator / a);
}


function clearRow(i) {
    if (i == 1) {
        m11.value = ''
        m12.value = ''
        m13.value = ''
    }
    if (i == 2) {
        m21.value = ''
        m22.value = ''
        m23.value = ''
    }

}

function reduceRational(x) {
    var a = x.num;
    var b = x.den;
    var c;
    while (b) {
        c = a % b; a = b; b = c;
    }
    return new Rational(x.num / a, x.den / a)
}

class FractionOp {

/*    constructor() {
    }*/

    reduced(x) {
        var a = x.num;
        var b = x.den;
        var c;
        while (b) {
            c = a % b; a = b; b = c;
        }
        return new Rational(x.num / a, x.den / a)
        }
    

    add(x,y) {
        var newNum = x.num * y.den + x.den * y.num;
        var newDen = x.den * y.den;
        var newRat = new Rational(newNum, newDen);
        return this.reduced(newRat);
    }

    subtract(x,y) {
        var newNum = x.num * y.den - x.den * y.num;
        var newDen = x.den * y.den;
        var newRat = new Rational(newNum, newDen);
        return this.reduced(newRat);
    }

    multiply(x,y) {
        var newNum = x.num * y.num;
        var newDen = x.den * y.den;
        var newRat = new Rational(newNum, newDen);
        return this.reduced(newRat);
    }

    divide(x,y) {
        var newNum = x.num * y.den;
        var newDen = x.den * y.num;
        var newRat = new Rational(newNum, newDen);
        return this.reduced(newRat);
    }   
}




function getDOMMatrix(rowCount, colCount) {
    let matrix = new Array(rowCount);
    for (let i = 0; i < rowCount; i++) {
        matrix[i] = new Array(colCount);
        for (let j = 0; j < colCount; j++) {
            // Construct the id
            let id = `input-${i+1}${j+1}`;
            // Get the DOM element by id
            let element = document.getElementById(id);
            // Store the DOM element in the matrix
            matrix[i][j] = element;
        }
    }

    return matrix;
}

// Assuming the ids are in the format "row-col" (e.g., "1-2")
function storeMatrix(rowCount, colCount) {
    let matrix = new Array(rowCount);
    for (let i = 0; i < rowCount; i++) {
        matrix[i] = new Array(colCount);
        for (let j = 0; j < colCount; j++) {
            // Construct the id
            let id = `input-${i+1}${j+1}`;
            // Get the DOM element by id
            let element = document.getElementById(id);
            // Store the DOM element in the matrix
            matrix[i][j] = toRational(element.value);
        }
    }

    matrices.push(matrix);
}

// Assuming the ids are in the format "row-col" (e.g., "1-2")
function getMatrix(rowCount, colCount) {
    let matrix = new Array(rowCount);
    for (let i = 0; i < rowCount; i++) {
        matrix[i] = new Array(colCount);
        for (let j = 0; j < colCount; j++) {
            // Construct the id
            let id = `input-${i+1}${j+1}`;
            // Get the DOM element by id
            let element = document.getElementById(id);
            // Store the DOM element in the matrix
            matrix[i][j] = toRational(element.value);
        }
    }

    return matrix;
}

// Assuming the ids are in the format "row-col" (e.g., "1-2")
function storeMatrix(A) {
    let colCount = A[0].length
    let rowCount = A.length

    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            // Construct the id
            let id = `input-${i+1}${j+1}`;
            // Get the DOM element by id
            let element = document.getElementById(id);
            // store entry in DOM element
            element.value = A[i][j].display();
        }
    }
}

function switchOperation(mat, i, j) {
    let rowi = mat[parseInt(i)-1];
    let rowj = mat[parseInt(j)-1];

}


function toggleInputs() {
  let radio1 = document.getElementById('switch');
  let radio2 = document.getElementById('mult');
  let radio3 = document.getElementById('mult-add');
  let input1 = document.getElementById('scalar');
  let input2 = document.getElementById('rowi');
  let input3 = document.getElementById('rowj');

  // console.log(radio1.checked, radio2.checked, radio3.checked)
  // console.log(input1.disabled, input2.disabled)

  if (radio1.checked) {
    input1.disabled = true;
    input2.disabled = false;
    input3.disabled = false;
  } else if (radio2.checked) {
    input1.disabled = false;
    input2.disabled = false;
    input3.disabled = true;
  } else {
    input1.disabled = false;
    input2.disabled = false;
    input3.disabled = false;
  }
}


function printAction(action) {
    let alpha = action[1];
    let Ri = action[2];
    let Rj = action[3];

    switch (action[0]) {
    case "switch":
        console.log(`Switch rows ${Ri} and ${Rj}`);
        return 
        break;
    case "mult":
        console.log(`Multiply row ${alpha.display()}*${Ri}`);
        break;
    case "mult-add":
        console.log(`Multiple row and add ${alpha.display()}*${Ri} + ${Rj} to ${Rj}`);
        break;
    default:
    }
}

function undoAction(action) {
    let alpha = action[1];
    let Ri = action[2];
    let Rj = action[3];
    let undoAct = [];

    matrix_iteration = matrix_iteration - 1;

    switch (action[0]) {
    case "switch":
        console.log(`Switch rows ${Ri} and ${Rj}`);
        undoAct = ["switch", null, Rj, Ri];
        return 
        break;
    case "mult":
        console.log(`Multiply row 1/${alpha.display()}*${Ri}`);
        undoAct = ["mult", F.divide(toRational("1"), alpha).display() , Ri, null];
        break;
    case "mult-add":
        console.log(`Multiple row and add ${alpha.display()}*${Ri} + ${Rj} to ${Rj}`);
        //undoAct = ["mult-add", F.divide(toRational("1"),alpha).display(), Ri, Rj];
        break;
    default:
    }
}


var a11 = toRational(m11.value)
var a12 = toRational(m12.value)
var a13 = toRational(m13.value)
var a21 = toRational(m21.value)
var a22 = toRational(m22.value)
var a23 = toRational(m23.value)
var a31 = toRational(m31.value)
var a32 = toRational(m32.value)
var a33 = toRational(m33.value)
var alpha = toRational(scalar.value)

var row1 = [a11,a12,a13]
var row2 = [a21,a22,a23]
var row3 = [a31,a32,a33]
var matrix_iteration = 0

var F = new FractionOp()


var DOMmat = getDOMMatrix(3, 3);
var mat = getMatrix(3, 3);
console.log(mat);


addBtn.addEventListener('click', (event) => {
    a11 = toRational(m11.value)
    a12 = toRational(m12.value)
    a13 = toRational(m13.value)
    console.log(a11,a12,a13)
    addAnswer.value = F.add(F.add(a11, a12), a13).display()
    console.log(addAnswer.value)
})

calculateBtn.addEventListener('click', (event) => {
    // console.log(scalar.value)
    // console.log(row1.value)
    // console.log(row2.value)
    var selectedOption = document.querySelector("input[name=row_op]:checked");
    var selectedRowi = document.querySelector('select[name=rowi]');
    var selectedRowj = document.querySelector('select[name=rowj]');


    a11 = toRational(m11.value)
    a12 = toRational(m12.value)
    a13 = toRational(m13.value)
    a21 = toRational(m21.value)
    a22 = toRational(m22.value)
    a23 = toRational(m23.value)
    a31 = toRational(m31.value)
    a32 = toRational(m32.value)
    a33 = toRational(m33.value)
    alpha = toRational(scalar.value)

    var row1 = [m11,m12,m13];
    var row2 = [m21,m22,m23];
    var row3 = [m31,m32,m33];
    var matrix = [row1,row2,row3];
    var act = [];

    // var i = selectedRowi.value[selectedRowi.value.length-1]
    // var j = selectedRowj.value[selectedRowj.value.length-1]
    // var Ri = matrix[i-1];
    // var Rj = matrix[j-1];


    if (selectedOption != null) {
        // console.log(selectedOption.value);
        switch(selectedOption.value) {
          case "switch":
            var i = selectedRowi.value[selectedRowi.value.length-1]
            var j = selectedRowj.value[selectedRowj.value.length-1]
            act = ["switch", null, "R"+i, "R"+j];
            actions.push(act);
            printAction(act);


            if (i+j == "12" || i+j == "21") {
                var temp1 = m11.value
                var temp2 = m12.value
                var temp3 = m13.value
                m11.value = m21.value
                m12.value = m22.value
                m13.value = m23.value
                m21.value = temp1
                m22.value = temp2
                m23.value = temp3

            } else if (i+j == "13" || i+j == "31") {
                var temp1 = m11.value;
                var temp2 = m12.value;
                var temp3 = m13.value;
                m11.value = m31.value;
                m12.value = m32.value;
                m13.value = m33.value;
                m31.value = temp1;
                m32.value = temp2;
                m33.value = temp3;

            } else if (i+j == "23" || i+j == "23") {
                var temp1 = m31.value;
                var temp2 = m32.value;
                var temp3 = m33.value;
                m31.value = m21.value;
                m32.value = m22.value;
                m33.value = m23.value;
                m21.value = temp1;
                m22.value = temp2;
                m23.value = temp3;

            }
            matrix_iteration = matrix_iteration + 1;

            break;

          case "mult":
            switch(selectedRowi.value) {
                case "rowi-1":
                    m11.value = F.multiply(alpha,toRational(m11.value)).display()
                    m12.value = F.multiply(alpha,toRational(m12.value)).display()
                    m13.value = F.multiply(alpha,toRational(m13.value)).display()
                    act = ["mult", alpha, "R1", null]
                    actions.push(act);
                    printAction(act);
                    break;
                case "rowi-2":
                    m21.value = F.multiply(alpha,toRational(m21.value)).display()
                    m22.value = F.multiply(alpha,toRational(m22.value)).display()
                    m23.value = F.multiply(alpha,toRational(m23.value)).display()
                    act = ["mult", alpha, "R2", null]
                    actions.push(act);
                    printAction(act);
                    break;
                case "rowi-3":
                    m31.value = F.multiply(alpha,toRational(m31.value)).display()
                    m32.value = F.multiply(alpha,toRational(m32.value)).display()
                    m33.value = F.multiply(alpha,toRational(m33.value)).display()
                    act = ["mult", alpha, "R3", null]
                    actions.push(act);
                    printAction(act);
                    break;
                default:
            }
            matrix_iteration = matrix_iteration + 1;

            break;
             
          case "mult-add":
            var i = selectedRowi.value[selectedRowi.value.length-1]
            var j = selectedRowj.value[selectedRowj.value.length-1]

            var Ri = matrix[i-1];
            var Rj = matrix[j-1];

            for (let n = 0; n < 3; n++) {
                console.log(alpha,toRational(Ri[n].value),toRational(Rj[n].value));
                Rj[n].value = F.add(F.multiply(alpha,toRational(Ri[n].value)),toRational(Rj[n].value)).display();
            }
            act = ["mult-add", alpha, "R"+i, "R"+j];
            actions.push(act);
            printAction(act);
            matrix_iteration = matrix_iteration + 1;


            break;
          default:
            // code block
        }
    }
})



// subtractBtn.addEventListener('click', (event) => {
//     number1 = toRational(input1.value)
//     number2 = toRational(input2.value)
//     subtractAnswer.value = F.subtract(number1, number2).display()
// })

// multiplyBtn.addEventListener('click', (event) => {
//     number1 = toRational(input1.value)
//     number2 = toRational(input2.value)
//     multiplyAnswer.value = F.multiply(number1, number2).display()
// })

// divideBtn.addEventListener('click', (event) => {
//     number1 = toRational(input1.value)
//     number2 = toRational(input2.value)
//     divideAnswer.value = F.divide(number1, number2).display()
// })

// clearBtn.addEventListener('click', (event) => {
//     input1.value = ''
//     input2.value = ''
//     addAnswer.value = ''
//     subtractAnswer.value = ''
//     multiplyAnswer.value = ''
//     divideAnswer.value = ''
// })

