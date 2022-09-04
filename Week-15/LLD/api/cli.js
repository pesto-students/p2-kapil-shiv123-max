import promptSync from "prompt-sync";
import parkingLot from "../models/parkingLot.js";
import car from "../models/car.js";
import parser from "./parser.js";
const prompt = promptSync({ sigint: true });

let parkingLotCreated = false;
let parkingLotInstance = null;
let exit = false;

const parserInstance = new parser(parkingLotInstance,parkingLotCreated);

while (!exit) {
  const command = prompt("$ ");
  const args = command.split(" ").splice(1);
  parserInstance.parse(command.split(' ')[0],args);
}
