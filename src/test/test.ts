class A {
  test = 10;
  hello() {
    console.log(this.test);
  }

  say = () => {
    console.log(this.test);
  };
}

// let o = {
//   name: 'hehe'
// };

// let t = new A();

// A.prototype.hello.bind(o);
// // t.hello.bind(o);
// console.log();

// t.hello();

class B {
  hello = new A().say;
  test() {
    this.hello();
  }

  say() {}
}

new B().test();
