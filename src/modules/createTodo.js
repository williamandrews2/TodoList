const createToDo = (title, description, dueDate, priority, completed) => {
  return {
    title,
    description,
    dueDate,
    priority,
    completed,
  };
};

export default createToDo;
