import parser from "./parser.js";
import fs from "fs";
import events from "events";
import readline from "readline";

const parseFile = (filePath) => {
  let parkingLotCreated = false;
  let parkingLotInstance = null;

  const parserInstance = new parser(parkingLotInstance, parkingLotCreated);

  (async function processLineByLine() {
    try {
      const rl = readline.createInterface({
        input: fs.createReadStream(filePath),
        crlfDelay: Infinity,
      });

      rl.on("line", (line) => {
        const args = line.split(" ").splice(1);
        parserInstance.parse(line.split(" ")[0], args);
      });

      await events.once(rl, "close");
    } catch (err) {
      console.error(err);
    }
  })();
};

export default parseFile;