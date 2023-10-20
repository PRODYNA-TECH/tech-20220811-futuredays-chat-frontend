import fg from "fast-glob";
import fs from "fs";
import replaceInFile from "replace-in-file";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

type Filename = string;
type TaskId = string;

type Example = {
  block: string;
  content: string;
};

type Solution = { block: string; content: string };

type TaskDefinition = {
  id: TaskId; // Aufgabe 1.1
  nr?: number; // 1
  file: Filename;
  example?: Example;
  solution?: Solution;
};

const taskPattern = /Aufgabe (\S+) -/;
const taskNumberPattern = /\d+/;

async function searchTasksInFiles(): Promise<Record<TaskId, TaskDefinition>> {
  const files = await fg("**/*.tsx", { ignore: ["node_modules/**"] });
  const tasks: Record<TaskId, TaskDefinition> = {};

  for (const file of files) {
    const contents = await fs.promises.readFile(file, "utf8");
    const lines = contents.split("\n");

    for (const line of lines) {
      const matches = line.match(taskPattern);
      if (matches) {
        const taskId = matches[1];
        if (!tasks[taskId]) {
          tasks[taskId] = { id: taskId, file };
        }
        const taskNumberMatch = taskId.match(taskNumberPattern);
        tasks[taskId].nr = parseInt(taskNumberMatch[0]);

        for (const match of matches) {
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
  const pattern = new RegExp(
    String.raw`\{\/\* Example ${taskId}\n([\s\S]*)\n\s*Example ${taskId}.*\}`
  );
  const matches = contents.match(pattern);
  if (matches) {
    return { block: matches[0], content: matches[1] };
  }
}

async function findSolution(
  taskId: TaskId,
  file: Filename
): Promise<Solution | null> {
  const contents = await fs.promises.readFile(file, "utf8");
  const regex = String.raw`\{\/\* Lösung ${taskId} - start .*\*\/\}\n([\s\S]*)\n\s*\{\/\* Lösung ${taskId} - end .*\*\/\}`;
  const pattern = new RegExp(regex);
  const matches = contents.match(pattern);
  if (matches) {
    return { block: matches[0], content: matches[1] };
  }
}

async function applyTask(task: TaskDefinition) {
  const file = task.file;
  const solution = task.solution;
  const example = task.example;

  const replacementFromExample = example ? example.content : "";

  if (solution) {
    await replaceInFile.replaceInFile({
      files: file,
      from: solution.content,
      to: replacementFromExample,
    });
  }

  if (example) {
    await replaceInFile.replaceInFile({
      files: file,
      from: example.block,
      to: "",
    });
  }
}

async function applyAllTasks(tasks: Record<TaskId, TaskDefinition>) {
  for (const task in tasks) {
    await applyTask(tasks[task]);
  }
}

async function listGitBranches(): Promise<string[]> {
  const { stdout } = await execPromise("git branch -a");
  return stdout.split("\n").map((line) => line.trim());
}

async function switchGitBranch(branch: string) {
  const { stdout } = await execPromise(`git switch ${branch}`);
  return stdout.split("\n").map((line) => line.trim());
}

async function containsGitBranch(branch: string) {
  const branches = await listGitBranches();
  return branches.includes(branch);
}

async function deleteGitBranchIfItExists(branch: string) {
  if (await containsGitBranch(branch)) {
    await execPromise(`git branch -D ${branch}`);
  }
  if (await containsGitBranch("remotes/origin/" + branch)) {
    await execPromise(`git push origin --delete ${branch}`);
  }
}

async function createGitBranch(branch: string) {
  await execPromise(`git switch -c ${branch}`);
  await execPromise(`git push --set-upstream origin ${branch}`);
}

async function addAllFilesAndCommit(message: string) {
  await execPromise(`git add .`);
  await execPromise(`git commit -m "${message}"`);
}

async function pushCurrentBranch() {
  await execPromise(`git push`);
}

function taskToBranchName(taskNr: number): string {
  return `task/${taskNr}`;
}

function filterTasksBiggerThan(
  tasks: Record<TaskId, TaskDefinition>,
  nr: number
): TaskDefinition[] {
  return Object.values(tasks).filter((task) => task.nr > nr);
}

function extractLastTaskNr(tasks: Record<TaskId, TaskDefinition>): number {
  return Math.max(...Object.values(tasks).map((task) => task.nr));
}

async function main() {
  await switchGitBranch("main");
  const tasks = await searchTasksInFiles();
  const lastTaskNr = extractLastTaskNr(tasks);

  for (var taskNr = 0; taskNr <= lastTaskNr; taskNr++) {
    console.log(`>> apply task ${taskNr}`);
    const branchName = taskToBranchName(taskNr);
    await deleteGitBranchIfItExists(branchName);
    await createGitBranch(branchName);

    if (taskNr !== lastTaskNr) {
      // only change all tasks other than the last one
      // (because the last one is the final state = main branch)
      const tasksToApply = filterTasksBiggerThan(tasks, taskNr);
      for (const task of tasksToApply) {
        await applyTask(task);
      }

      await addAllFilesAndCommit(`apply task ${taskNr}`);
    }
    await pushCurrentBranch();
    await switchGitBranch("main");
  }
}

main().catch(console.error);
