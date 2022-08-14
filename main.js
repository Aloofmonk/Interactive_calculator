class Calculator{
    constructor(beforeContainer,currentContainer){
        this.beforeContainer = beforeContainer
        this.currentContainer = currentContainer
        this.allClear()
    }

    allClear(){
        this.beforeContainerText = ""
        this.currentContainerText = ""
        this.operation = ""
    }

    delete(){
        if(this.currentContainerText === this.computation){
            this.currentContainerText = this.computation.toString()
        }
        this.currentContainerText = this.currentContainerText.slice(0, -1)
    }

    chooseOperation(operation){
        if(operation){
            this.compute()
        }
        this.beforeContainerText = `${this.currentContainerText} ${operation}`
        this.currentContainerText = ""
        this.operation = operation
    }

    compute(){
        let computation
        let beforecont = parseFloat(this.beforeContainerText)
        let currentcont = parseFloat(this.currentContainerText)
        if(isNaN(beforecont)||isNaN(currentcont))return

        switch(this.operation){
            case '+':
                computation = beforecont + currentcont
                break
            case '*':
                computation = beforecont * currentcont
                break
            case '/':
                computation = beforecont / currentcont
                break
            case '-':
                computation = beforecont - currentcont
                break
        }
        this.computation = computation
        this.currentContainerText = computation
        this.beforeContainerText = ""
        this.operation = ""
    }

    appendNumber(number){
        if(number === '.' && this.currentContainerText.includes('.'))return
        if(this.currentContainerText === this.computation){
            this.currentContainerText =""
        }
        this.currentContainerText = this.currentContainerText.toString() + number.toString()
        this.number = number
    }

    display(){
        this.currentContainer.innerText = this.currentContainerText
        this.beforeContainer.innerText = this.beforeContainerText
    }
}

const beforeContainer = document.querySelector('[data-before-container]')
const currentContainer = document.querySelector('[data-current-container]')
const clearButton = document.querySelector('[data-clear]')
const deletButton = document.querySelector('[data-delet]')
const operationButtons = document.querySelectorAll('[data-operation]')
const numberButtons = document.querySelectorAll('[data-button]')
const equalsButton = document.querySelector('[data-equals]')

let calculator = new Calculator(beforeContainer, currentContainer)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.display()
    })
})

clearButton.addEventListener('click', () => {
    calculator.allClear()
    calculator.display()
})

deletButton.addEventListener('click', () => {
    calculator.delete()
    calculator.display()
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.display()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.display()
})