var Person = function () {};
Person.prototype.initialize = function (name, age) {
  this.name = name;
  this.age = age;
};

function Teacher() {};

Object.setPrototypeOf(Teacher.prototype, Person.prototype);

Teacher.prototype.teach = function (subject) {
  console.log(`${this.name} is teaching ${subject}`);
};

const t1 = new Teacher();
t1.initialize("Adam", 45);
t1.teach("Inheritance");

