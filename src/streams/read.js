import fs from "node:fs";
import { stdout } from "node:process";

const read = async () => {
  const fileName = "src/streams/files/fileToRead.txt";
  const readStream = fs.createReadStream(fileName);
  readStream.pipe(stdout);
  readStream.on("end", () => {
    console.log();
  });
};

await read();
