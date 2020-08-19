export default class Calculator {
    constructor() {
        this.buttonContainer = document.querySelector("#button-container");
        this.currentOutputDisplay = document.querySelector("#current-output-display");
        // console.log(this.currentOutputDisplay.textContent);
        this.bufferDisplay = document.querySelector("#buffer-display");
        this.operator = this.getEmptyOperator();
        this.buttonContainer.addEventListener("click", this.handleButtonClick.bind(this)); //TODO: currently this doesn't handle clicks on elements inside the buttons properly. This could cause issues in the future.
    }

    //simplify interaction with the display
    get currentOutput() {
        // console.log(this.currentOutputDisplay.textContent);
        return this.currentOutputDisplay.textContent;
    }
    set currentOutput(value) {
        //TODO: once operator is a class, we can show the current operator inline here
        this.currentOutputDisplay.textContent = value;
    }

    get buffer() {
        return this.bufferDisplay.textContent;
    }
    set buffer(value) {
        this.bufferDisplay.textContent = value;
    }

    // empty operator that does nothing
    getEmptyOperator() {
        return (left, right) => {
            return parseFloat(right);
        };
    }

    handleButtonClick(event) {
        // Allow the event to bubble up to the container, and handle all clicks there instead of attaching separate handlers to each button
        if (event.target.nodeName === "BUTTON") {
            const inputType = event.target.dataset.inputType;
            switch (inputType) {
                case "digit":
                    this.addInput(parseInt(event.target.textContent));
                    break;
                case "add":
                case "subtract":
                case "multiply":
                case "divide":
                    this.inputOperator(inputType);
                    break;
                case "decimal":
                    this.inputDecimal();
                    break;
                case "clear":
                    this.inputClear();
                    break;
                case "equals":
                    console.log(this.calculate());
                    break;

                default:
                    console.warn("No matching input type found");
                    break;
            }
        }
    }

    addInput(input) {
        // //TODO: make this accept a string of input. Currently the below code doesn't work
        // [...input].forEach((char) => {
        //     if (this.currentOutput === "0") {
        //         this.currentOutput = char;
        //     } else {
        //         this.currentOutput += char;
        //     }
        // }, this); //pass this to maintain scope
        // return this.currentOutput;
        if (this.currentOutput === "0") {
            this.currentOutput = input;
        } else {
            this.currentOutput += input;
        }
        return this.currentOutput;
    }

    inputOperator(operator) {
        this.buffer = parseFloat(this.currentOutput);
        this.currentOutput = 0;
        switch (operator) {
            case "add":
                this.operator = (left, right) => {
                    return left + right;
                };
                break;
            case "subtract":
                this.operator = (left, right) => {
                    return left - right;
                };
                break;
            case "multiply":
                this.operator = (left, right) => {
                    return left * right;
                };
                break;
            case "divide":
                this.operator = (left, right) => {
                    if (right == 0) {
                        window.alert("Cannot divide by zero");
                        return left;
                    } else {
                        return left / right;
                    }
                };
                break;

            default:
                break;
        }
    }

    inputDecimal() {
        // check to make sure we haven't already got a decimal
        if (!this.currentOutput.includes(".")) {
            this.addInput(this.currentOutput === "0" ? "0." : ".");
        }
    }

    inputClear() {
        this.buffer = 0;
        this.currentOutput = 0;
        this.operator = this.getEmptyOperator();
    }

    calculate() {
        this.buffer = this.operator(parseFloat(this.buffer), parseFloat(this.currentOutput));
        this.currentOutput = 0;
        return Number(this.buffer);
    }
}
