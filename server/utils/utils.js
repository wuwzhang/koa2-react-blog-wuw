// const utils = require("utils");

/**
 * 判断对象是否为初始值
 * @param  {[type]} obj 对象
 * @return {[type]}     是否为初始值
 */
function isEmpty() {
  for (let obj of arguments) {
    if (obj === null || obj === "" || obj === undefined) {
      return true;
    }
  }
  return false;
}

/**
 * 将字符串分割成数组，去除相同和空的元素
 * @param  {String} str   需要分割成数组的字符串
 * @param  {string} split 分割符号如';'
 * @return {array}       分割后的数组
 */
function getArrBySplitStr(str, split) {
  let arr =
    typeof str === "string" && str.constructor === String
      ? str.split(split)
      : str;
  return [...new Set(arr)].filter(item => {
    return item.length > 0;
  });
}

/**
 * 数组求并集
 */
function unionArray(arr1, arr2) {
  let setArr1 = new Set(arr1),
    setArr2 = new Set(arr2);

  return Array.from(new Set(setArr1.contact(setArr2)));
}

/**
 * 数组求交集
 */
function intersectionArray(arr1, arr2) {
  let setArr2 = new Set(arr2);

  return Array.from(new Set(arr1.filter(v => setArr2.has(v))));
}

/**
 * 数组求差集
 */
function differenceArray(arr1, arr2) {
  let setArr1 = new Set(arr1),
    setArr2 = new Set(arr2);

  return Array.from(
    new Set(arr1.concat(arr2).filter(v => !setArr1.has(v) || !setArr2.has(v)))
  );
}

module.exports = {
  isEmpty,
  getArrBySplitStr,
  intersectionArray,
  unionArray,
  differenceArray
};
