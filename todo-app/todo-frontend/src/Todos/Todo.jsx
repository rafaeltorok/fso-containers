export default function Todo({ todo, deleteTodo, completeTodo }) {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo)
  }

  const onClickComplete = (todo) => () => {
    completeTodo(todo)
  }

  const doneInfo = (
    <span>
      <button onClick={onClickDelete(todo)}> Delete </button>
    </span>
  )

  const notDoneInfo = (
    <span>
      <button onClick={onClickDelete(todo)}> Delete </button>
      <button onClick={onClickComplete(todo)}> Set as done </button>
    </span>
  )

  return (
    <div className="todo-item">
      <span className={todo.done ? "done-todo" : ""}>
        {todo.text}
      </span>
      {todo.done ? doneInfo : notDoneInfo}
    </div>
  );
}
