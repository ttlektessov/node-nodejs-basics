import fs from "node:fs";
import { stdout } from "node:process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
  const filePath = path.join(__dirname, "files", "fileToRead.txt");
  const readStream = fs.createReadStream(filePath);
  readStream.pipe(stdout);
  readStream.on("end", () => {
    console.log();
  });
};

await read();
