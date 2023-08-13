function consoleLog() {
  console.log("4");
  console.log("5");
  console.log("6");

  return consoleLog();
}

console.log("1");
console.log("2");
console.log("3");

consoleLog();

for (let i = 0; i < 1000000; i++) {
  console.log(i);
}
