import { createReadStream, createWriteStream } from "node:fs";
import process from "node:process";
import { createGzip } from "node:zlib";
import { pipeline } from "node:stream";

const compress = async () => {
  const gzip = createGzip();
  const source = createReadStream("src/zip/files/fileToCompress.txt");
  const destination = createWriteStream("src/zip/files/archieve.gz");

  pipeline(source, gzip, destination, (err) => {
    if (err) {
      console.error("An error occurred:", err);
      process.exitCode = 1;
    }
  });
};

await compress();
