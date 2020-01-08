// ?? var is global variable function scoped ==> Available everywhere
// !! let & const are block scoped ==> Available in the scope (block or function)

const age = 100;

function go() {
  const myAge = 200;
  const hair = 'blonde';
  console.log(age);
  console.log(myAge);
  console.log(hair);
}

go();

function isCool(name) {
  if (name === 'wes') {
    var cool = true;
  }
  console.log(cool);
  return cool;
}

for (let i = 0; i < 10; i++) {
  console.log(i);
}

// scope look up ==> lexically. It cares where it's defined NOT where it's run
const dog = 'snickers';

function logDog(dog) {
  console.log(dog);
}

function go2() {
  const dog = 'sunny';
  logDog('sunny');
}

go2();

function yell() {
  console.log(name.toUpperCase());
}

function sayHi(name) {
  yell();
}

yell();

// !! Function are also function scoped.
