const sym1 = Symbol("num");
const sym2 = Symbol("num");

const obj = {
  a: 1,
  [sym1]: 2,
  b: 3,
  obj2: {
    [sym2]: 4,
    c: 5,
  },
};

let result = Object.values(obj);

console.log(result);
