class Calculator {
    // this constructor takes all the input and functions for it.
    constructor(queryLineElements, answerLineElements) {
        this.queryLineElements = queryLineElements;
        this.answerLineElements = answerLineElements;
        //this clear function resets all the values once a set of calculations is over
        this.clear()
    }

    // functions
    clear() {
        //this clears all the functions and undefined is used 
        // since no operation is involved when clearing things.
        this.clearAnswerLine = ''
        this.clearQueryLine = ''
        this.operation = undefined
    }

    delete() {
        this.clearAnswerLine = this.clearAnswerLine.toString().slice(0, -1)
    }

    appendNumber(number) {
        //this.clearQueryLine = this.clearQueryLine.toString() + number.toString();
        if (number === '.' && this.clearAnswerLine.includes('.')) return
        // this allows only one period symbol to be added to the queryLine
        this.clearAnswerLine = this.clearAnswerLine.toString() + number.toString();
        // this function allows us to click on the required number and adds it to the screen
    }


    chooseOperation(operation) {
        if (this.clearAnswerLine === '') return
        if (this.clearAnswerLine !== '') {
            this.compute()
        }
        // this function allows us to click on the required operation and adds it to the screen
        this.operation = operation
        this.clearQueryLine = this.clearAnswerLine
        this.clearAnswerLine = ''

    }

    compute() {
        // takes in the values and does maths...
        let computation
        const quer = parseFloat(this.clearQueryLine)
        const ans = parseFloat(this.clearAnswerLine)
        // this code below is instead for a bunch of if statements
        if (isNaN(quer) || isNaN(ans)) return
        switch (this.operation) {
            case '+':
                computation = quer + ans
                break
            case '*':
                computation = quer * ans
                break
            case '-':
                computation = quer - ans
                break
            case '÷':
                computation = quer / ans
                break
            default:
                return
        }
        this.clearAnswerLine = computation
        this.operation = undefined
        this.clearQueryLine = ''
    }

    getDisplayNumber(number) {

        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }
    updateDisplay() {
        // returns the calculated values to display on the screen

        this.answerLineElements.innerText = this.getDisplayNumber(this.clearAnswerLine)

        if (this.operation != null) {
            this.queryLineElements.innerText =
                `${this.getDisplayNumber(this.clearQueryLine)} ${this.operation}`
        }
        else {
            this.queryLineElements.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operatorsButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-allClear]');
const equalButton = document.querySelector('[data-equals]');
const queryLineElements = document.querySelector('[data-query]');
const answerLineElements = document.querySelector('[data-answer]');


const calculator = new Calculator(queryLineElements, answerLineElements);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operatorsButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})