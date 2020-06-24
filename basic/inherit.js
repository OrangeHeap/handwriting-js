// JavaScript多种继承方式

/**
 * 知识关联
 * 建议与手写call、apply、new一起食用效果更佳
 */

/**
 * 原型链继承
 * 缺点
 * 1、原型是所有子类实例共享的，改变一个其他也会改变。
 * 2、在创建 Child 的实例时，不能向Parent传参
 */
function Parent1() {
  this.name = '我是你爸爸'
}

Parent1.prototype.getName = function () {
  console.log(this.name)
}

function Child1() {}

Child1.prototype = new Parent1();

let child1 = new Child1();

// 输出：我是你爸爸
console.log(child1.getName())

/**
 * 借用构造函数（经典继承）
 * 优点
 * 1、避免了引用类型的属性被所有实例共享
 * 2、可以在Child中向Parent传参
 * 缺点
 * 1、方法都在构造函数中定义，每次创建实例都会创建一遍方法。
 * 2、父类原型对象中一旦存在方法那么子类无法继承
 */
// 先定义一个父亲
function Parent2(name) {
  this.name = name
}

function Child2(name) {
  Parent2.call(this, name);
}

let child21 = new Child2('我是儿子21');
let child22 = new Child2('我是儿子22');

// 输出：我是儿子21
console.log(child21.name);
// 输出：我是儿子22
console.log(child22.name);


/**
 * 寄生组合继承
 * 优点
 * 1、融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。
 */
function Parent3(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}

Parent3.prototype.getName = function () {
  console.log(this.name);
}

function Child3(name, age) {
  Parent3.call(this, name);
  this.age = age;
}

Child3.prototype = Object.create(Parent3.prototype, {
  constructor: {
    value: Child3
  }
});

let child31 = new Child3('我是儿子31', '18');

child31.colors.push('black');

// 输出：我是儿子31
console.log(child31.name);
// 输出：18
console.log(child31.age);
// 输出：["red", "blue", "green", "black"]
console.log(child31.colors);

let child32 = new Child3('我是儿子32', '20');

// 输出：我是儿子32
console.log(child32.name);
// 输出：20
console.log(child32.age);
// 输出：["red", "blue", "green"]
console.log(child32.colors);

/**
 * 封装一个继承方法
 */

function inherit(constructor, superConstructor) {
  constructor.super_ = superConstructor;
  constructor.prototype = Object.create(superConstructor.prototype, {
    constructor: {
      value: constructor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
}
