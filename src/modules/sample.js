import projectController from "./projectController";
import createToDo from "./createTodo";

const createSampleProject = () => {
  // TESTING:
  projectController.addProject("Work");

  const todo1 = createToDo(
    "Go to work",
    "Arrive at work ready to work.",
    "2025-02-26",
    "Medium",
    false
  );

  const todo2 = createToDo(
    "Go grocery shopping",
    "Purchase milk, eggs, and yogurt.",
    "2025-03-30",
    "High",
    false
  );

  const todo3 = createToDo(
    "Plan next vacation",
    "Create plans for this next year.",
    "2025-02-23",
    "Low",
    false
  );

  projectController.getProject("Work").addTodo(todo1);
  projectController.getProject("Work").addTodo(todo2);
  projectController.getProject("Work").addTodo(todo3);
};

export default createSampleProject;
