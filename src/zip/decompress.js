import { createReadStream, createWriteStream } from "node:fs";
import process from "node:process";
import { createGunzip } from "node:zlib";
import { pipeline } from "node:stream";

const decompress = async () => {
  const source = createReadStream("src/zip/files/archieve.gz");
  const destination = createWriteStream("src/zip/files/fileToCompress.txt");
  const gunzip = createGunzip();

  pipeline(source, gunzip, destination, (err) => {
    if (err) {
      console.error("An error occurred:", err);
      process.exitCode = 1;
    }
  });
};

await decompress();
