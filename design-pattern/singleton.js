function Singleton(name) {
  this.name = name;
}

Singleton.prototype.getName = function () {
  return this.name;
}

Singleton.getInstance = (function () {
  let instance;

  return function (name) {
    if (!instance) {
      instance = new Singleton(name);
    }

    return instance;
  }
})()


var a = Singleton.getInstance('ConardLi');
var b = Singleton.getInstance('ConardLi2');

console.log(a===b);   //true
