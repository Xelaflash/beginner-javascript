/* eslint-disable */

// !! Hoisting permits to access function/variable before they are created

// !! variable Hoisting ==>
let age;
//  JS will create above line as variable declaration
console.log(age);
age = 10;

/* What does this file do? */
sayHi();

/* How does this file do it? */
function sayHi() {
  console.log('hey!');
  console.log(add(10, 2));
}

// will not be hoist. only classing function declaration.
const add = (a, b) => a + b;
