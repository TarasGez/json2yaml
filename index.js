// Run: node index.js
const data = require("./data.json");

// How many spaces need from left side
const SP = ' ';

function parser(data) {
  let yaml = "";

  function saver(string) {
    yaml = yaml + string + '\n';
  }

  function countSpaces() {
    // Because a global object is also an object
    let count = -1;
    
    function increase() {
      return count++;
    }
    
    function decrease() {
      return count--;
    }
    
    function getCount() {
      let space = '';
      for(let i = 0; i <= count; i++) {
        space = space + SP;
      }
      return space;
    }
    
    return {
        increase,
        decrease,
        getCount
      }
    }
    
    const count = countSpaces();
    
    function parseObject(obj, arrayFlag) {
      for (const [key, value] of Object.entries(obj)) {
        typeof value === "object" ? nextParse(key, value) : show(obj, key, value, arrayFlag);
      }
    }
    
    function parseArray(array) {
      for (let i = 0; i < array.length; i++) {
        parseObject(array[i], true);
      }
    }
    
    function show(obj, key, value, arrayFlag) {
      const keys = Object.keys(obj);
      arrayFlag ? keys.indexOf(key) === 0
        ? saver(`${count.getCount()}- ${key}: ${value}`)
          : saver(`${count.getCount()}  ${key}: ${value}`)
            : saver(`${count.getCount()}${key}: ${value}`)
    }
    
    function nextParse(key, value) {
      saver(`${count.getCount()}${key}:`)
      count.increase();
      Array.isArray(value) ? parseArray(value) : parseObject(value);
      count.decrease();
    }
    
    parseObject(data);  

    return yaml;
}

const result = parser(data);

console.log(result)

fs = require('fs');
fs.writeFile('result.yaml', result,
  function (err) {
    if (err) return console.log(err);
    console.log('The result of the program can be checked in result.yaml');
  })
