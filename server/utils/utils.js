const utils = require('utils');


/**
 * 判断对象是否为初始值
 * @param  {[type]} obj 对象
 * @return {[type]}     是否为初始值
 */
function isEmpty(){
  for (let obj of arguments) {
    if(obj === null || obj === '' || obj === undefined){
      return true;
    }
  }
  return false;
}

module.exports = {
  isEmpty
}
