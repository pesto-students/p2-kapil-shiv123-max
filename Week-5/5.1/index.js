const getName = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Shivanshu Amitabh");
    }, 1000);
  });
};

const getAddress = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("West Digghi Tank, Darbhanga, Bihar");
    }, 1000);
  });
};

const getMobile = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(9999999999);
    }, 1000);
  });
};

async function* getPersonalDetails(getName, getAddress, getMobile) {
  const name = await getName();
  yield name;

  const address = await getAddress();
  yield address;

  const mobileNumber = await getMobile();
  yield mobileNumber;
}

const person1 = getPersonalDetails(getName, getAddress, getMobile);

person1.next().then((val) => console.log("Name is :", val.value));
person1.next().then((val) => console.log("Address is :", val.value));
person1.next().then((val) => console.log("Mobile Number is :", val.value));
