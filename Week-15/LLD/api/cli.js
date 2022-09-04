import promptSync from "prompt-sync";
import parkingLot from "../models/parkingLot.js";
import car from "../models/car.js";

const prompt = promptSync({ sigint: true });
let parkingLotCreated = false;
let parkingLotInstance = null;
let exit = false;
while (!exit) {
  const command = prompt("$ ");
  const args = command.split(" ").splice(1);
  switch (command.split(" ")[0]) {
    case "create_parking_lot":
      {
        if (args.length < 1) {
          console.log(
            `Invalid number of arguments. Required: 1 Given: ${args.length}`
          );
          break;
        }
        parkingLotInstance = new parkingLot(Number(args[0]));
        parkingLotCreated = true;
      }
      break;
    case "park":
      {
        if (args.length < 2) {
          console.log(
            `Invalid number of arguments. Required: 2 Given: ${args.length}`
          );
          break;
        }
        if (!parkingLotCreated) {
          console.log("No parking lot has been created.");
          break;
        }
        parkingLotInstance.park(new car(args[0], args[1]));
      }
      break;
    case "leave":
      {
        if (args.length < 1) {
          console.log(
            `Invalid number of arguments. Required: 1 Given: ${args.length}`
          );
          break;
        }
        if (!parkingLotCreated) {
          console.log("No parking lot has been created.");
          break;
        }
        parkingLotInstance.leave(args[0]);
      }
      break;
    case "status": {
      if (!parkingLotCreated) {
        console.log("No parking lot has been created.");
        break;
      }
      parkingLotInstance.status();
    }
    case "registration_numbers_for_cars_with_colour":
      {
        if (args.length < 1) {
          console.log(
            `Invalid number of arguments. Required: 1 Given: ${args.length}`
          );
          break;
        }
        if (!parkingLotCreated) {
          console.log("No parking lot has been created.");
          break;
        }
        parkingLotInstance.filterByColor(args[0]);
      }
      break;
    case "slot_numbers_for_cars_with_colour":
      {
        if (args.length < 1) {
          console.log(
            `Invalid number of arguments. Required: 1 Given: ${args.length}`
          );
          break;
        }
        if (!parkingLotCreated) {
          console.log("No parking lot has been created.");
          break;
        }
        parkingLotInstance.filterSlots("color", args[0]);
      }
      break;
    case "slot_number_for_registration_number":
      {
        if (args.length < 1) {
          console.log(
            `Invalid number of arguments. Required: 1 Given: ${args.length}`
          );
          break;
        }
        if (!parkingLotCreated) {
          console.log("No parking lot has been created.");
          break;
        }
        parkingLotInstance.filterSlots("registration number", args[0]);
      }
      break;
    case "exit": {
      exit = true;
      break;
    }
    default: {
      console.log(`Invalid command ${command}`);
    }
  }
}
