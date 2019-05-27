class A {
    constructor() {
        this.test = 10;
        this.say = () => {
            console.log(this.test);
        };
    }
    hello() {
        console.log(this.test);
    }
}
class B {
    constructor() {
        this.hello = new A().say;
    }
    test() {
        this.hello();
    }
    say() { }
}
new B().test();
//# sourceMappingURL=test.js.map