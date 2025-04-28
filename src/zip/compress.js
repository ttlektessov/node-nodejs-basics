import { createReadStream, createWriteStream } from "node:fs";
import process from "node:process";
import { createGzip } from "node:zlib";
import { pipeline } from "node:stream";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compress = async () => {
  const fileToCompressPath = path.join(
    __dirname,
    "files",
    "fileToCompress.txt"
  );
  const archivePath = path.join(__dirname, "files", "archive.gz");
  const gzip = createGzip();
  const source = createReadStream(fileToCompressPath);
  const destination = createWriteStream(archivePath);

  pipeline(source, gzip, destination, (err) => {
    if (err) {
      console.error("An error occurred:", err);
      process.exitCode = 1;
    }
  });
};

await compress();
