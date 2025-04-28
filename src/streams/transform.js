import { stdin, stdout } from "node:process";
import { Transform } from "node:stream";

const transform = async () => {
  const reverseStream = new Transform({
    transform(chunk, encoding, callback) {
      const reverse = chunk.toString().split("").reverse().join("");
      callback(null, reverse);
    },
  });
  stdin.pipe(reverseStream).pipe(stdout);
};

await transform();
