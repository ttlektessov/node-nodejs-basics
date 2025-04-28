import fs from "node:fs";
import { stdin } from "node:process";

const write = async () => {
  const fileName = "src/streams/files/fileToWrite.txt";
  const writeStream = fs.createWriteStream(fileName);
  stdin.pipe(writeStream);
};

await write();
