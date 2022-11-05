const TaskForm = ({createTask, name, handleInputChange, isEditing, updateTask }) => {
  return (
    <form className="task-form" onSubmit={isEditing ? updateTask : createTask}>
        <input placeholder="add a task" type="text" name="name" value={name} onChange={handleInputChange} />
     <button type="submit">{isEditing ? "Edit" : "Add"}</button>
    </form>
  )
}

export default TaskForm  