import fs from "node:fs";

const folderName = "src/fs/files";
const list = async () => {
  fs.readdir(folderName, (err, files) => {
    if (err) console.error("FS operation failed");
    else {
      files.forEach((file) => {
        console.log(file);
      });
    }
  });
};

await list();
