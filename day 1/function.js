let a = 3;
function f1() {
    console.log(f2());
    console.log(a);
}
function f2() {
    return f3();
}
function f3() {
    let a = 10;
    return a;
}
f1();