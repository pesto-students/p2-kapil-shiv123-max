import parkingLot from "../models/parkingLot.js";
import car from "../models/car.js";

class parser {
  constructor(parkingLotInstance, parkingLotCreated) {
    this.parkingLotCreated = parkingLotCreated;
    this.parkingLotInstance = parkingLotInstance;
  }

  parse(command, args) {
    switch (command) {
      case "create_parking_lot":
        {
          if (args.length < 1) {
            console.log(
              `Invalid number of arguments. Required: 1 Given: ${args.length}`
            );
            break;
          }
          this.parkingLotInstance = new parkingLot(Number(args[0]));
          this.parkingLotCreated = true;
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
          if (!this.parkingLotCreated) {
            console.log("No parking lot has been created.");
            break;
          }
          this.parkingLotInstance.park(new car(args[0], args[1]));
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
          if (!this.parkingLotCreated) {
            console.log("No parking lot has been created.");
            break;
          }
          this.parkingLotInstance.leave(args[0]);
        }
        break;
      case "status": {
        if (!this.parkingLotCreated) {
          console.log("No parking lot has been created.");
          break;
        }
        this.parkingLotInstance.status();
        break;
      }
      case "registration_numbers_for_cars_with_colour":
        {
          if (args.length < 1) {
            console.log(
              `Invalid number of arguments. Required: 1 Given: ${args.length}`
            );
            break;
          }
          if (!this.parkingLotCreated) {
            console.log("No parking lot has been created.");
            break;
          }
          this.parkingLotInstance.filterByColor(args[0]);
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
          if (!this.parkingLotCreated) {
            console.log("No parking lot has been created.");
            break;
          }
          this.parkingLotInstance.filterSlots("color", args[0]);
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
          if (!this.parkingLotCreated) {
            console.log("No parking lot has been created.");
            break;
          }
          this.parkingLotInstance.filterSlots("registration number", args[0]);
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
}

export default parser;