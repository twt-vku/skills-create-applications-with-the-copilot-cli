/**
 * Node.js CLI Calculator
 *
 * Supported operations:
 *   addition       (+)    – sum two numbers
 *   subtraction    (-)    – find the difference between two numbers
 *   multiplication (*)    – multiply two numbers together
 *   division       (/)    – divide two numbers (division by zero is handled)
 *   modulo         (%)    – return the remainder of a divided by b
 *   exponentiation (**)   – raise base to the power of exponent
 *   square root    (sqrt) – return the square root of n (negative numbers are handled)
 *
 * Usage:
 *   node calculator.js <number1> <operator> <number2>
 *   node calculator.js sqrt <number>
 *
 * Examples:
 *   node calculator.js 5 + 3      => 8
 *   node calculator.js 9 - 4      => 5
 *   node calculator.js 6 * 7      => 42
 *   node calculator.js 10 / 2     => 5
 *   node calculator.js 10 % 3     => 1
 *   node calculator.js 2 ** 8     => 256
 *   node calculator.js sqrt 9     => 3
 */

// Addition: returns the sum of a and b
function add(a, b) {
  return a + b;
}

// Subtraction: returns the difference of a and b
function subtract(a, b) {
  return a - b;
}

// Multiplication: returns the product of a and b
function multiply(a, b) {
  return a * b;
}

// Division: returns the quotient of a divided by b
// Throws an error if b is zero to prevent division by zero
function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed.");
  }
  return a / b;
}

// Modulo: returns the remainder of a divided by b
// Throws an error if b is zero to prevent division by zero
function modulo(a, b) {
  if (b === 0) {
    throw new Error("Modulo by zero is not allowed.");
  }
  return a % b;
}

// Power: returns base raised to the power of exponent
function power(base, exponent) {
  return Math.pow(base, exponent);
}

// Square Root: returns the square root of n
// Throws an error if n is negative
function squareRoot(n) {
  if (n < 0) {
    throw new Error("Square root of a negative number is not allowed.");
  }
  return Math.sqrt(n);
}

// Export functions for use in tests and other modules
module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot };

// CLI entry point
function main() {
  const args = process.argv.slice(2);

  // sqrt takes a single operand: sqrt <number>
  if (args.length === 2 && args[0] === "sqrt") {
    const n = parseFloat(args[1]);
    if (isNaN(n)) {
      console.error("Error: Operand must be a valid number.");
      process.exit(1);
    }
    try {
      console.log(`sqrt(${n}) = ${squareRoot(n)}`);
    } catch (err) {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    }
    return;
  }

  if (args.length !== 3) {
    console.error("Usage: node calculator.js <number1> <operator> <number2>");
    console.error("       node calculator.js sqrt <number>");
    console.error("Operators: + - * / % **");
    process.exit(1);
  }

  const a = parseFloat(args[0]);
  const operator = args[1];
  const b = parseFloat(args[2]);

  if (isNaN(a) || isNaN(b)) {
    console.error("Error: Both operands must be valid numbers.");
    process.exit(1);
  }

  let result;

  switch (operator) {
    case "+":
      result = add(a, b);
      break;
    case "-":
      result = subtract(a, b);
      break;
    case "*":
      result = multiply(a, b);
      break;
    case "/":
      try {
        result = divide(a, b);
      } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
      }
      break;
    case "%":
      try {
        result = modulo(a, b);
      } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
      }
      break;
    case "**":
      result = power(a, b);
      break;
    default:
      console.error(`Error: Unsupported operator "${operator}". Use +, -, *, /, %, or **`);
      process.exit(1);
  }

  console.log(`${a} ${operator} ${b} = ${result}`);
}

// Only run CLI when executed directly, not when required as a module
if (require.main === module) {
  main();
}
