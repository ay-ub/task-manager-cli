#!/usr/bin/env node

import inquirer from "inquirer";
import fs from "fs";

const filePath = "./tasks.json";

const ReadTasks = () => {
  try {
    if (fs.existsSync(filePath)) {
      const tasks = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(tasks);
    } else {
      fs.writeFileSync(filePath, "[]");
      return [];
    }
  } catch (error) {
    return [];
  }
};
const checkEmpty = (tasks) => {
  if (tasks.length === 0) {
    console.log("====================================");
    console.log("No tasks found");
    console.log("====================================");
    return;
  }
};
const createTask = () => {
  const tasks = ReadTasks();
  inquirer
    .prompt([
      {
        type: "input",
        name: "task",
        message: "What is the task? ",
      },
    ])
    .then((answers) => {
      tasks.push({ task: answers.task });
      fs.writeFileSync(filePath, JSON.stringify(tasks));
      console.log("====================================");
      console.log("Task added successfully");
      console.log("====================================");
      console.log("Tasks:");
      console.table(tasks);
      console.log("====================================");
    })
    .catch((error) => {
      console.log("error", error);
    });
};
const deleteTask = () => {
  const tasks = ReadTasks();
  checkEmpty(tasks);
  inquirer
    .prompt([
      {
        type: "list",
        name: "task",
        message: "Select a task to delete :",
        choices: tasks.map((task) => task.task),
      },
      {
        type: "confirm",
        name: "confirm",
        message: "Are you sure you want to delete the task?",
      },
    ])
    .then((answers) => {
      if (!answers.confirm) {
        console.log("====================================");
        console.log("Task not deleted");
        console.log("====================================");
        return;
      }
      const newTasks = tasks.filter((task) => task.task !== answers.task);
      fs.writeFileSync(filePath, JSON.stringify(newTasks));
      console.log("====================================");
      console.log("Task deleted successfully");
      console.log("====================================");
      console.log("Tasks after deletion:");
      console.table(newTasks);
      console.log("====================================");
    })
    .catch((error) => {
      console.log("error", error);
    });
};

const viewTasks = () => {
  const tasks = ReadTasks();
  //check if tasks is empty
  checkEmpty(tasks);
  console.table(tasks);
};

const updateTask = () => {
  const tasks = ReadTasks();
  checkEmpty(tasks);
  inquirer
    .prompt([
      {
        type: "list",
        name: "task",
        message: "Select a task to update",
        choices: tasks.map((task) => task.task),
      },
      {
        type: "input",
        name: "newTask",
        message: "Enter the new task",
      },
    ])
    .then((answers) => {
      const newTasks = tasks.map((task) => {
        if (task.task === answers.task) {
          task.task = answers.newTask;
        }
        return task;
      });
      fs.writeFileSync(filePath, JSON.stringify(newTasks));
      console.log("====================================");
      console.log("Task updated successfully");
      console.log("====================================");
      console.log("Tasks:");
      console.table(newTasks);
      console.log("====================================");
    })
    .catch((error) => {
      console.log("error", error);
    });
};

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
        "Exit.",
      ],
    },
  ])
  .then((answers) => {
    if (answers.operation === "Add a task") {
      console.log("==== Adding a task ====");
      createTask();
    } else if (answers.operation === "View tasks") {
      console.log("==== Viewing tasks ====");
      viewTasks();
    } else if (answers.operation === "Delete a task") {
      console.log("==== Deleting a task ====");
      deleteTask();
    } else if (answers.operation === "Update a task") {
      console.log("==== Updating a task ====");
      updateTask();
    } else {
      console.log("Exiting");
      process.exit();
    }
  })
  .catch((error) => {
    console.log("error", error);
    process.exit();
  });
