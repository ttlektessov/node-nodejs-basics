import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateHash = async () => {
  const filePath = path.join(__dirname, "files", "fileToCalculateHashFor.txt");
  const hash = createHash("sha256");
  const input = createReadStream(filePath);
  input.on("readable", () => {
    const data = input.read();
    if (data) hash.update(data);
    else {
      console.log(`${hash.digest("hex")} ${filePath}`);
    }
  });
};

await calculateHash();
