import os from "os";
import path from "path";
import { Worker } from "node:worker_threads";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workerPath = path.join(__dirname, "worker.js");

const performCalculations = async () => {
  const numCPUs = os.cpus().length;
  const workers = [];

  for (let i = 0; i < numCPUs; i++) {
    const worker = new Worker(path.resolve(workerPath), {
      workerData: 10 + i,
    });
    const workerPromise = new Promise((resolve) => {
      worker.on("message", (data) => {
        resolve({ status: "resolved", data });
      });

      worker.on("error", () => {
        resolve({ status: "error", data: null });
      });
    });

    workers.push(workerPromise);
  }

  const results = await Promise.all(workers);
  console.log(results);
};

await performCalculations();
