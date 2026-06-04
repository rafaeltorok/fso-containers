import React, { useState } from "react";

const TodoForm = ({ createTodo }) => {
  const [text, setText] = useState("");

  const onChange = ({ target }) => {
    setText(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTodo({ text });
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="input-form">
      <input type="text" name="text" value={text} onChange={onChange} />
      <button type="submit"> Submit </button>
    </form>
  );
};

export default TodoForm;
