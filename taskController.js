import fs from "fs";
import inquirer from "inquirer";

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
      console.log("Tasks after addition:");
      viewTasks();
      console.log("====================================");
    })
    .catch((error) => {
      console.log("error", error);
    });
};
const deleteTask = () => {
  const tasks = ReadTasks();
  if (tasks.length === 0) {
    console.log("====================================");
    console.log("No tasks found");
    console.log("====================================");
    return;
  }
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
      viewTasks();
    })
    .catch((error) => {
      console.log("error", error);
    });
};

const viewTasks = () => {
  const tasks = ReadTasks();
  //check if tasks is empty
  if (tasks.length === 0) {
    console.log("====================================");
    console.log("No tasks found");
    console.log("====================================");
    return;
  }
  console.table(tasks);
};

const updateTask = () => {
  const tasks = ReadTasks();
  if (tasks.length === 0) {
    console.log("====================================");
    console.log("No tasks found");
    console.log("====================================");
    return;
  }
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
      viewTasks();
    })
    .catch((error) => {
      console.log("error", error);
    });
};

const findTask = () => {
  const tasks = ReadTasks();
  if (tasks.length === 0) {
    console.log("====================================");
    console.log("No tasks found");
    console.log("====================================");
    return;
  }
  inquirer
    .prompt([
      {
        type: "input",
        name: "task",
        message: "Enter the task to find",
      },
    ])
    .then((answers) => {
      const foundTasks = tasks.filter((task) =>
        task.task.includes(answers.task)
      );
      if (foundTasks.length === 0) {
        console.log("====================================");
        console.log("Task not found");
        console.log("====================================");
        return;
      }
      console.table(foundTasks);
    })
    .catch((error) => {
      console.log("error", error);
    });
};
export { createTask, deleteTask, viewTasks, updateTask, findTask };
