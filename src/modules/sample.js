import projectController from "./projectController";
import createToDo from "./createTodo";

const createSampleProject = () => {
  // TESTING:
  projectController.addProject("Personal");

  const todo1 = createToDo(
    "Go to work",
    "Arrive at work at 7:45 AM.",
    "2025-05-26",
    "High",
    false
  );

  const todo2 = createToDo(
    "Go grocery shopping",
    "Purchase milk, eggs, and yogurt.",
    "2025-03-30",
    "Medium",
    false
  );

  const todo3 = createToDo(
    "Plan next vacation",
    "Create vacation plans for this next year.",
    "2025-04-02",
    "Low",
    false
  );

  projectController.getProject("Personal").addTodo(todo1);
  projectController.getProject("Personal").addTodo(todo2);
  projectController.getProject("Personal").addTodo(todo3);
};

export default createSampleProject;
