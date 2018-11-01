/**
* This function will return a object on which all method calls will be logged
* @param {Object} obj
*/
function logAllMethodCalls (obj) {
  let handler = {
    get(target, propKey) {
      return function (...args) {
        console.log([propKey].concat(args).join(' '))
      }
    }
  };
  return new Proxy(obj, handler);
}

module.exports = {
  logAllMethodCalls
};