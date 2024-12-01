import { formatCurrency } from "../scripts/utils/money.js";

console.log("test suite: formatCurrency"); //related test cases are called test suite

//Basic Test Case
console.log("converts cents into dollars");

if (formatCurrency(2095) === "20.95") {
  console.log("passed");
} else {
  console.log("failed");
}

//Edge Cases
console.log("works with 0");

if (formatCurrency(0) === "0.00") {
  console.log("passed");
} else {
  console.log("failed");
}

console.log("rounds up to the nearest cent");

if (formatCurrency(2000.5) === "20.01") {
  console.log("passed");
} else {
  console.log("failed");
}

if (formatCurrency(1000.4) === "10.00") {
  console.log("passed");
} else {
  console.log("failed");
}
