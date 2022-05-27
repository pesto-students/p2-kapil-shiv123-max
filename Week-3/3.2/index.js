let contactInfo = {
  firstName: "Shivanshu",
  lastName: "Amitabh",
  age: 21,
};

const printInfo = function (district, state, phoneNumber) {
  console.log(
    `Here is the personal information of the new employee that joined - His name is ${this.firstName} ${this.lastName}. He is ${this.age} years old. He is from ${district}, ${state}. His contact number is ${phoneNumber}. `
  );
};

// Call Example
printInfo.call(contactInfo, "Darbhanga", "Bihar", 9876543210);

//Apply Example
printInfo.apply(contactInfo, ["Darbhanga", "Bihar", 9876543210]);

//Bind Example
const giveContactInfo = printInfo.bind(
  contactInfo,
  "Darbhanga",
  "Bihar",
  9876543210
);
giveContactInfo();
