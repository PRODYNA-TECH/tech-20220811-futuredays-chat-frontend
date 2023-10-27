# Getting Started with Create React App

This project was bootstrapped with [Vite](https://github.com/vitejs/vite-plugin-react).

## Available Scripts

In the project directory, you can run:

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://vitejs.dev/guide/static-deploy.html) for more information.

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173/) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run serve`

Builds and serves the app from the `build` folder.\

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

## Solutions Tooling

In order to build solution branches you can run the following command:

```bash
npm run build-solutions
```

This will build a branch from for each task.

### Authoring rules

You can build hte entire solution in the main branch. This will be fully functional. With some special comments you can define the tasks, the solutions and examples. Finally you can build the solution branches with special tooling.

In order to get the parsing rules you neefd to stick to the following conventions:

Each tasks has a description within the following comment block like:

```js
{/* Aufgabe 1 - Arbitrary Title
   the task description
*/}
```

Make sure tu use unique task identifiers like `Aufgabe 1' or 'Aufgabe 1.1'. This will result as one task numbered 4. You got it: one task can have multiple subtasks. You need to stick to the wording 'Aufgabe' for now.

For each Task we need to have a solution. The solution is a comment block like:

```js
{/* Lösung 1 - start */}
<Login onLogin={login} />
{/* Lösung 1 - end */}
```

Also here you need to follow the conventions. The solution identifier is `Lösung` followed by the task identifier. The solution identifier is followed by the keyword `start` or `end`. This is important for the parsing.

For each task we can have example code. The examples are comment blocks like:

```js
{/* Example 1
<Login onLogin={alert('HIER')} />
Example 1 */}
```

Once you run the tooling, the example block will be deleted and the contained code will be placed in the according solution block.
