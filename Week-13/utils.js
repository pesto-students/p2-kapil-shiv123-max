export const daysDifference = (inputDate) => {
  let presentDate = new Date();
  const inputDateArray = inputDate.split("-");
  [inputDateArray[0], inputDateArray[1]] = [
    inputDateArray[1],
    inputDateArray[0],
  ];
  const inputDateString = inputDateArray.join("/");
  let inputtedDate = new Date(inputDateString);
  let difference = inputtedDate.getTime() - presentDate.getTime();
  let daysDiff = Math.ceil(difference / (1000 * 3600 * 24));
  return daysDiff;
};
