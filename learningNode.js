// var a = 10, b = 20;
// console.log(a+b);

// const { log } = require("console");

// const prompt = require('prompt-sync')(); // for taking input from user
// const n = prompt("kitne aadmi the...????");
// console.log(`khr rha hai ki ${n}`);

// one way to write function in js
// function sum(a, b) {
//   return a + b;
// }

// second way to write function in js
// const sum = function(a, b){
//   return a + b;
// }

// third way to write function in js
// const sum = (a,b) => {return a+b}

// fourth way to write function in js
const sum = (a,b) => a+b;
const ans = sum(6, 8);
console.log(ans);

// fifth way to write function in js
(function(){
  console.log("hello world");
})();

// callback function is a function that is called by someone else
function callback(){ // callback function
  console.log("adding is successfully completed");
}

// main function that is callback function
const add = function(a, b, callback){
  let sum = a+b;
  console.log(sum);
  callback(); // calling callback function
}

add(8, 7, callback);

// packages in node js 
let fs = require('fs');
let os = require('os');

let user = os.userInfo();
console.log(user);
console.log(user.username);

fs.appendFile("./greetings.txt", "Hello " + user.username + "!\n", function(){
  console.log("file created successfully");
})

fs.appendFile("./greetings.txt", "Hi " + user.username + "!\n", ()=>{
  console.log("file created successfully");
})

// console.log("os functions", os);
// console.log("fs functions", fs);


// now we want to find the unique elements from this array, here we can use lodash package function
var data = ["person", "person", 1, 2, 3, 1, 2, "name", "age", 2];

// lodash is a package that has lots of inbuild functions that help us in dealing with data
var _ = require('lodash'); // requiring lodash package in "_" is a convention

// to filter the unique element with the help of lodash package
var filter = _.uniq(data);
console.log(filter);

// another example of lodash function
console.log(_.isString("hello")); // string so will give true
console.log(_.isString(3)); // number so will give false
console.log(_.isString(true)); // boolean so will give false

