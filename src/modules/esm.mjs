// 1.esm style import
import path from "path";
import { release, version } from "os";
import { createServer as createServerHttp } from "http";
import "./files/c.cjs";
import { fileURLToPath } from "url";

const random = Math.random();

let unknownObject;

//from https://nodejs.org/dist/latest-v22.x/docs/api/esm.html
//Import attributes are an inline syntax for module import statements to pass on more information alongside the module specifier.
//The type: 'json' attribute is mandatory when importing JSON modules.

//2. put type for json files
if (random > 0.5) {
  unknownObject = await import("./files/a.json", {
    with: { type: "json" },
  });
} else {
  unknownObject = await import("./files/b.json", {
    with: { type: "json" },
  });
}

//3.get filename and dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
  res.end("Request accepted");
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log("To terminate it, use Ctrl+C combination");
});

//4.esm style export
export { unknownObject, myServer };
