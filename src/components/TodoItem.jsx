import React, { useState } from "react";

const TodoItem = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);

  const handleToggle = () => {
    onToggle(todo.id, todo.is_complete);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    if (editText.trim() && editText !== todo.title) {
      await onUpdate(todo.id, editText.trim());
    }
    setEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.title);
    setEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <li className="px-4 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.is_complete}
          onChange={handleToggle}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        {editing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyPress}
            className="ml-3 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            autoFocus
          />
        ) : (
          <span
            className={`ml-3 text-sm font-medium ${
              todo.is_complete ? "line-through text-gray-500" : "text-gray-900"
            }`}
            onDoubleClick={handleEdit}
          >
            {todo.title}
          </span>
        )}
      </div>
      <div className="flex space-x-2">
        {editing ? (
          <>
            <button
              onClick={handleSave}
              className="text-sm text-green-600 hover:text-green-900"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEdit}
              className="text-sm text-indigo-600 hover:text-indigo-900"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-sm text-red-600 hover:text-red-900"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
