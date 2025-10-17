// small sample dataset
const snippets = [
  {
    id: "closure-counter",
    title: "Closure - Counter Example",
    tags: ["javascript", "closure"],
    short: "Create a private counter using closure.",
    example: `function counter() {
let count = 0;
return function() {
count++;
console.log(count);
}
}
const c = counter();
c(); // 1
c(); // 2`,
  },
  {
    id: "hoisting-var-func",
    title: "Hoisting - Var vs Function",
    tags: ["javascript", "hoisting"],
    short: "Demonstrate hoisting behavior of var and function",
    example: `console.log(a); // undefined
var a = 5;
hoistedFunc(); // Works
function hoistedFunc() { console.log('Hoisted'); }`,
  },
  {
    id: "this-call-apply-bind",
    title: "This binding - call/apply/bind",
    tags: ["javascript", "this"],
    short: "Use call, apply, bind to control 'this'",
    example: `function greet(age) {
  console.log(\`\${this.name} is \${age} years old\`);
}
const user = { name: 'Alice' };
greet.call(user, 25);
greet.apply(user, [30]);
const bound = greet.bind(user, 35);
bound();`,
  },
  {
    id: "async-promises",
    title: "Async - Promises vs setTimeout",
    tags: ["javascript", "async"],
    short: "Understand event loop: microtask vs macrotask",
    example: `console.log('Start');
setTimeout(() => console.log('Timeout'), 0);
Promise.resolve().then(() => console.log('Promise'));
console.log('End');
// Output: Start, End, Promise, Timeout`,
  },
  {
    id: "currying",
    title: "Currying Function",
    tags: ["javascript", "functional"],
    short: "Function returning function for partial application",
    example: `function add(a) {
  return function(b) {
    return a + b;
  }
}
const add5 = add(5);
console.log(add5(10)); // 15`,
  },
  {
    id: "iife",
    title: "Immediately Invoked Function Expression (IIFE)",
    tags: ["javascript", "iife"],
    short: "Run a function immediately after definition",
    example: `(function() {
  console.log('IIFE executed!');
})();`,
  },
  {
    id: "spread-rest",
    title: "Spread & Rest operators",
    tags: ["javascript", "es6"],
    short: "Copy arrays/objects and gather remaining params",
    example: `const nums = [1,2,3];
const nums2 = [...nums,4];
const [first, ...rest] = nums2;
console.log(first, rest);`,
  },
  {
    id: "optional-chaining",
    title: "Optional chaining & Nullish coalescing",
    tags: ["javascript", "es6"],
    short: "Safe property access and default values",
    example: `const user = { name: 'Bob' };
console.log(user?.age ?? 18); // 18`,
  },
  {
    id: "template-literals",
    title: "Template literals",
    tags: ["javascript", "es6"],
    short: "Use backticks for interpolation",
    example: `const name = 'Alice';
const greeting = \`Hello, \${name}!\`;
console.log(greeting);`,
  },
  {
    id: "js-map",
    title: "Array map",
    tags: ["javascript", "array"],
    short: "Create a new array by applying a function to each element.",
    example: `const nums = [1,2,3]; const doubled = nums.map(n => n * 2); // [2,4,6]`,
  },
  {
    id: "js-filter",
    title: "Array filter",
    tags: ["javascript", "array"],
    short: "Return elements that pass a test.",
    example: `const nums = [1,2,3,4]; const evens = nums.filter(n => n % 2 === 0); // [2,4]`,
  },
  {
    id: "js-reduce",
    title: "Array reduce",
    tags: ["javascript", "array"],
    short: "Return elements that pass a test.",
    example: `const nums = [1,2,3,4];
const addSum = nums.reduce((acc, curr) => acc+ curr,0)
console.log(addSum); //10`,
  },
  {
    id: "js-array-destruct",
    title: "Destructuring array assignment",
    tags: ["javascript", "syntax"],
    short: "Extract values from arrays into variables.",
    example: `const numbers = [1,2,3]; const [first, second, third = 0] = numbers;`,
  },
  {
    id: "js-object-destruct",
    title: "Destructuring object assignment",
    tags: ["javascript", "syntax"],
    short: "Extract values from object into variables.",
    example: `const person = { name: "Alice", age: 25 }; const {name, age, city = "Unknown" } = person; `,
  },
  {
    id: "js-object-renaming",
    title: "Object renaming assignment",
    tags: ["javascript", "syntax"],
    short: "Extract values from object into variables.",
    example: `const person = {name: "Alice", age: 25}; const {name: fullName, age: years} = person;`,
  },
  {
    id: "html-sem",
    title: "Semantic HTML - <article>",
    tags: ["html", "semantic"],
    short: "Use semantic elements for meaning and accessibility.",
    example: `<article><h2>Title</h2><p>Content</p></article>`,
  },
];

export default snippets;
