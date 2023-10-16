import fg from "fast-glob";
import fs from "fs";

type Filename = string;
type TaskId = string;

type Example = {
  block: string;
  content: string;
}

type Solution = { block: string; content: string };

type TaskDefinition = {
  id: TaskId;
  file: Filename;
  example?: Example;
  solution?: Solution;
};

const taskPattern = /Aufgabe (\S+) -/;

async function searchFiles(): Promise<Record<TaskId, TaskDefinition>> {
  const files = await fg("**/*.tsx", { ignore: ["node_modules/**"] });
  const tasks: Record<TaskId, TaskDefinition> = {};

  for (const file of files) {
    const contents = await fs.promises.readFile(file, "utf8");
    const lines = contents.split("\n");
    const matches = lines.flatMap((line: any) => line.match(taskPattern));

    if (matches.length > 0) {
      // for every match, store the match as key and the files in the value array
      for (const match of matches) {
        if (match) {
          if (!tasks[match]) {
            tasks[match] = { id: match, file };
          }

          const example = await findExample(match, file);
          if (example) {
            tasks[match].example = example;
          }

          const solution = await findSolution(match, file);
          if (solution) {
            tasks[match].solution = solution;
          }
        }
      }
    }
  }

  return tasks;
}

async function findExample(
  taskId: TaskId,
  file: Filename
): Promise<Example | null> {
  const contents = await fs.promises.readFile(file, "utf8");
  const pattern = new RegExp(String.raw`\{\/\* Example ${taskId}\n([\s\S]*)\n\s*Example ${taskId}.*\}`);
  const matches = contents.match(pattern);
  if (matches) {
    return {block: matches[0], content: matches[1]};
  }
}

async function findSolution(taskId: TaskId, file: Filename): Promise<Solution | null> {
  const contents = await fs.promises.readFile(file, "utf8");
  const regex = String.raw`\{\/\* Lösung ${taskId} - start .*\*\/\}\n([\s\S]*)\n\s*\{\/\* Lösung ${taskId} - end .*\*\/\}`;
  const pattern = new RegExp(regex);
  const matches = contents.match(pattern);
  if (matches) {
    return {block: matches[0], content: matches[1]};
  }
}

searchFiles().then(console.log).catch(console.error);
