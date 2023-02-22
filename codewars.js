function calculate(expression) {
    // Step 1: Create empty stack and output list
    const operatorStack = [];
    const outputList = [];
  
    // Step 2: Convert input string into list of tokens
    const tokens = expression.match(/[-+]?\d*\.\d+|[-+]?\d+|[\+\-\*/\(\)]/g);
  
    // Step 3: Process tokens and add to output list
    for (const token of tokens) {
      if (!isNaN(parseFloat(token))) {
        // Token is a number, add to output list
        outputList.push(parseFloat(token));
      } else if (['+', '-', '*', '/'].includes(token)) {
        // Token is an operator, pop operators off stack
        // and add to output list until stack is empty
        while (operatorStack.length > 0 && ['*', '/'].includes(operatorStack[operatorStack.length - 1])) {
          outputList.push(operatorStack.pop());
        }
        operatorStack.push(token);
      } else if (token === '(') {
        // Token is a left parenthesis, push onto stack
        operatorStack.push(token);
      } else if (token === ')') {
        // Token is a right parenthesis, pop operators off stack
        // and add to output list until a left parenthesis is
        // encountered (but do not add the left parenthesis to
        // the output list)
        let foundLeftParen = false;
        while (operatorStack.length > 0) {
          const operator = operatorStack.pop();
          if (operator === '(') {
            foundLeftParen = true;
            break;
          } else {
            outputList.push(operator);
          }
        }
        if (!foundLeftParen) {
          throw new Error('Invalid expression: mismatched parentheses');
        }
      }
    }
  
    // Step 4: Evaluate output list of tokens
    const intermediateResults = [];
    for (const token of outputList) {
      if (!isNaN(parseFloat(token))) {
        // Token is a number, push onto stack
        intermediateResults.push(parseFloat(token));
      } else if (['+', '-', '*', '/'].includes(token)) {
        // Token is an operator, pop the top two items off the stack,
        // apply the operator, and push the result back onto the stack
        if (intermediateResults.length < 2) {
          throw new Error('Invalid expression: too many operators');
        }
        const operand2 = intermediateResults.pop();
        const operand1 = intermediateResults.pop();
        let result;
        if (token === '+') {
          result = operand1 + operand2;
        } else if (token === '-') {
          result = operand1 - operand2;
        } else if (token === '*') {
          result = operand1 * operand2;
        } else if (token === '/') {
          result = operand1 / operand2;
        }
        intermediateResults.push(result);
      }
    }
  
    // Step 5: The final result is the single remaining item on the stack
    if (intermediateResults.length !== 1) {
      throw new Error('Invalid expression: too few operators');
    }
    return intermediateResults[0];
  }
