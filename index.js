import inquirer from "inquirer";
import {
  createTask,
  deleteTask,
  viewTasks,
  updateTask,
  findTask,
} from "./taskController.js";

const promptUser = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "operation",
        message: "What do you want to do?",
        choices: [
          "Add a task.",
          "View tasks.",
          "Delete a task.",
          "Update a task.",
          "Find a task.",
          "Exit.",
        ],
      },
    ])
    .then((answers) => {
      if (answers.operation === "Add a task.") {
        console.log("==== Adding a task ====");
        createTask();
        promptUser();
      } else if (answers.operation === "View tasks.") {
        console.log("==== Viewing tasks ====");
        viewTasks();
        promptUser();
      } else if (answers.operation === "Delete a task.") {
        console.log("==== Deleting a task ====");
        deleteTask();
        promptUser();
      } else if (answers.operation === "Update a task.") {
        console.log("==== Updating a task ====");
        updateTask();
        promptUser();
      } else if (answers.operation === "Find a task.") {
        console.log("==== Finding a task ====");
        findTask();
        promptUser();
      } else {
        console.log("Exiting");
        process.exit();
      }
    })
    .catch((error) => {
      console.log("error", error);
      process.exit();
    });
};

promptUser();
