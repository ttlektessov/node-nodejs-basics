import fs from "node:fs";
import { stdout } from "node:process";

const read = async () => {
  const fileName = "src/streams/files/fileToRead.txt";
  const readStream = fs.createReadStream(fileName);
  readStream.on("data", (chunk) => {
    console.log("Chunk received:", chunk.toString());
  });
  readStream.pipe(stdout);
};

await read();
