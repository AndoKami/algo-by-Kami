function calculate(expression) {
    const OPERATORS = {
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
      "*": (a, b) => a * b,
      "/": (a, b) => a / b,
    };
  
    let tokens = expression.match(/\d+\.\d+|\d+|[-()+*/]/g);
  
    let values = [];
    let operators = [];
  
    for (let token of tokens) {
      if (/^\d/.test(token)) {
        values.push(parseFloat(token));
      } else if (token === "(") {
        operators.push(token);
      } else if (token === ")") {
        while (operators[operators.length - 1] !== "(") {
          let op = operators.pop();
          let b = values.pop();
          let a = values.pop();
          values.push(OPERATORS[op](a, b));
        }
        operators.pop();
      } else if (token in OPERATORS) {
        while (
          operators.length > 0 &&
          operators[operators.length - 1] in OPERATORS &&
          (token in { "+": 1, "-": 1 } ? OPERATORS[token](0, 0) <= OPERATORS[operators[operators.length - 1]](0, 0) : OPERATORS[token](0, 0) < OPERATORS[operators[operators.length - 1]](0, 0))
        ) {
          let op = operators.pop();
          let b = values.pop();
          let a = values.pop();
          values.push(OPERATORS[op](a, b));
        }
        operators.push(token);
      } else {
        
        throw "Invalid token: " + token;
      }
    }
  
    while (operators.length > 0) {
      let op = operators.pop();
      let b = values.pop();
      let a = values.pop();
      values.push(OPERATORS[op](a, b));
    }
  
    return values.pop();
  }
  console.log(calculate("2 + 3 * 4")); // Expected output: 14
console.log(calculate("(2 + 3) * 4")); // Expected output: 20
console.log(calculate("1.5 * 2.5 - 3.75 / 1.5")); // Expected output: 2.25
console.log(calculate("6 / (2 + 1)")); // Expected output: 2
console.log(calculate("(1 + 2) * 3 / (4 - 5)")); // Expected output: -9
console.log(calculate("3 * -2 + 5")); // Expected output: -1
console.log(calculate("-5 * (2 + 3)")); // Expected output: -25
  