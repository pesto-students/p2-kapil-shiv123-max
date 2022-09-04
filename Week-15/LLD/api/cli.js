import promptSync from "prompt-sync";
import parser from "./parser.js";
const prompt = promptSync({ sigint: true });

const cli = () => {
  let parkingLotCreated = false;
  let parkingLotInstance = null;
  let exit = false;

  const parserInstance = new parser(parkingLotInstance, parkingLotCreated);

  while (!exit) {
    const command = prompt("$ ");
    const args = command.split(" ").splice(1);
    exit = parserInstance.parse(command.split(" ")[0], args);
  }
};

export default cli;
