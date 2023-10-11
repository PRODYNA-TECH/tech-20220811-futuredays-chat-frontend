const fs = require("fs");
const fg = require("fast-glob");

const pattern = /Aufgabe \d+/;

async function searchTasksInFiles() {
  const files = await fg("**/*.tsx", { ignore: "node_modules/**" });
  const tasksInFiles = {};

  for (const file of files) {
    const contents = await fs.promises.readFile(file, "utf8");
    const lines = contents.split("\n");
    const matches = lines.flatMap((line) => line.match(pattern));

    if (matches.length > 0) {
      // for every match, store the match as key and the files in the value array
      for (const match of matches) {
        if (match) {
          // init array if not exists
          if (!tasksInFiles[match]) {
            tasksInFiles[match] = [];
          }
          // only add it once
          if (!tasksInFiles[match].includes(file)) {
            tasksInFiles[match].push(file);
          }
        }
      }
    }
  }

  return tasksInFiles;
}

searchTasksInFiles().then(console.log).catch(console.error);


