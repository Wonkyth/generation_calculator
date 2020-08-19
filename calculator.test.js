import Calculator from "./calculator.js";
import path from "path";
import fs from "fs";
const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
});

test("addInput works", () => {
    let calc = new Calculator();
    expect(calc.addInput("0")).toBe("0");
    expect(calc.addInput("0")).toBe("0");
    expect(calc.addInput("1")).toBe("1");
    expect(calc.addInput("2")).toBe("12");
    expect(calc.addInput("3")).toBe("123");
    expect(calc.addInput("4")).toBe("1234");
    expect(calc.addInput("5")).toBe("12345");
    expect(calc.addInput("6")).toBe("123456");
    expect(calc.addInput("7")).toBe("1234567");
    expect(calc.addInput("8")).toBe("12345678");
    expect(calc.addInput("9")).toBe("123456789");
    expect(calc.addInput("0")).toBe("1234567890");
});

test("1 + 1 = 2", () => {
    let calc = new Calculator();
    expect(calc.addInput("1")).toBe("1");
    calc.inputOperator("add");
    expect(calc.addInput("1")).toBe("1");
    expect(calc.calculate()).toBe(2);
});

test("1.2 + 0.45 = 1.65", () => {
    let calc = new Calculator();
    expect(calc.addInput("1")).toBe("1");
    calc.inputDecimal();
    expect(calc.addInput("2")).toBe("1.2");
    calc.inputOperator("add");
    calc.inputDecimal();
    expect(calc.addInput("4")).toBe("0.4");
    expect(calc.addInput("5")).toBe("0.45");
    expect(calc.calculate()).toBe(1.65);
});

test("20 - 12 = 8", () => {
    let calc = new Calculator();
    expect(calc.addInput("2")).toBe("2");
    expect(calc.addInput("0")).toBe("20");
    calc.inputOperator("subtract");
    expect(calc.addInput("1")).toBe("1");
    expect(calc.addInput("2")).toBe("12");
    expect(calc.calculate()).toBe(8);
});

test("4 - 5 = -1", () => {
    let calc = new Calculator();
    expect(calc.addInput("4")).toBe("4");
    calc.inputOperator("subtract");
    expect(calc.addInput("5")).toBe("5");
    expect(calc.calculate()).toBe(-1);
});

test("900.1 - 2.222 = 897.878", () => {
    let calc = new Calculator();
    expect(calc.addInput("9")).toBe("9");
    expect(calc.addInput("0")).toBe("90");
    expect(calc.addInput("0")).toBe("900");
    calc.inputDecimal();
    expect(calc.addInput("1")).toBe("900.1");
    calc.inputOperator("subtract");
    expect(calc.addInput("2")).toBe("2");
    calc.inputDecimal();
    expect(calc.addInput("2")).toBe("2.2");
    expect(calc.addInput("2")).toBe("2.22");
    expect(calc.addInput("2")).toBe("2.222");
    expect(calc.calculate()).toBe(897.878);
});

//TODO: find library to handle floating point errors
test.skip("4.4 * 5.5 = 24.2", () => {
    throw new Error("Not implemented");
});

test("6 * 7 = 42", () => {
    let calc = new Calculator();
    expect(calc.addInput("6")).toBe("6");
    calc.inputOperator("multiply");
    expect(calc.addInput("7")).toBe("7");
    expect(calc.calculate()).toBe(42);
});

test("40 / 8 = 5", () => {
    let calc = new Calculator();
    expect(calc.addInput("4")).toBe("4");
    expect(calc.addInput("0")).toBe("40");
    calc.inputOperator("divide");
    expect(calc.addInput("8")).toBe("8");
    expect(calc.calculate()).toBe(5);
});

test("1 / 3 = 0.3333333333333333", () => {
    let calc = new Calculator();
    expect(calc.addInput("1")).toBe("1");
    calc.inputOperator("divide");
    expect(calc.addInput("3")).toBe("3");
    expect(calc.calculate()).toBe(0.3333333333333333);
});

test("pressing equals after only entering one number outputs that number", () => {
    let calc = new Calculator();
    expect(calc.addInput("1")).toBe("1");
    expect(calc.calculate()).toBe(1);
});

test("pressing equals after entering a number and an operator outputs that number", () => {
    let calc = new Calculator();
    expect(calc.addInput("4")).toBe("4");
    calc.inputDecimal();
    expect(calc.calculate()).toBe(4);
});

test("7.7 - 7.7 = 0", () => {
    let calc = new Calculator();
    expect(calc.addInput("7")).toBe("7");
    calc.inputDecimal();
    expect(calc.addInput("7")).toBe("7.7");
    calc.inputOperator("subtract");
    expect(calc.addInput("7")).toBe("7");
    calc.inputDecimal();
    expect(calc.addInput("7")).toBe("7.7");
    expect(calc.calculate()).toBe(0);
});

//TODO: how to mock alert?
test.skip("divide by zero should put up an alert", () => {
    throw new Error("Not implemented");
});

test.skip("clear test", () => {
    throw new Error("Not implemented");
});

test.skip("clear test", () => {
    throw new Error("Not implemented");
});

test.todo("addInput accepts a string of input");
