import { program } from "commander";
import cli from "./api/cli.js";
import parseFile from "./api/file.js";

program.command("cli").action((options) => {
    cli();
});

program
  .command("file")
  .argument("<file_path>", "Path to commands file")
  .action((file_path, options) => {
    parseFile(file_path);
  });

program.parse();
