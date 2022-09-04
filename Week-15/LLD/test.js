import car from "./models/car.js";
import parkingLot from "./models/parkingLot.js";

const size = 6;
const p = new parkingLot(size);
const c1 = new car('KA-01-HH-1234','White');
const c2 = new car('KA-01-HH-1235','Red');
const c3 = new car('KA-01-HH-1236','Green');
const c4 = new car('KA-01-HH-1237','White');

p.park(c1);
p.park(c2);
p.park(c3);
p.park(c4);
p.leave(1);
p.status();
p.filterByColor('Whie');
p.filterSlots('registration number','KA-01-HH-1234');
p.filterSlots('color','White');