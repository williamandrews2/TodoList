import projectController from "./projectController";
import ui from "./ui";

function addNewProject(event) {
  event.preventDefault();
  const form = document.getElementById("add-project-form");
  const title = form.title.value;

  // validate the form before processing
  if (title.trim() == "") {
    alert("Title must be filled out!");
    return;
  }
  projectController.addProject(title);
  ui.renderProjectList();
}

export default addNewProject;
