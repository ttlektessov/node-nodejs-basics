import { fork } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const spawnChildProcess = async (args) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const scriptPath = path.join(__dirname, "files", "script.js");

  //without stdio option, streams will be isolated
  //and child process will not be able to communicate with the master process
  //checked some other students repos for reference, some opted to exclude this
  //and I'm not sure if it's counted as a mistake or not if it works
  const child = fork(scriptPath, args, {
    stdio: ["pipe", "pipe", "inherit", "ipc"],
  });

  // child stdin receives from master process and sends stdout to master process
  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);
};

// Put your arguments in function call to test this functionality
spawnChildProcess(["arg1", "arg2", "arg3"]);
