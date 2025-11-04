import React, { useState, useEffect } from "react";
import supabase from "../helper/helper";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";

const TodoList = ({ user, onLogout }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();

    // Subscribe to real-time changes
    const channel = supabase
      .channel("todos-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "todos",
        },
        (payload) => {
          setTodos((prevTodos) => [...prevTodos, payload.new]);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "todos",
        },
        (payload) => {
          setTodos((prevTodos) =>
            prevTodos.map((todo) =>
              todo.id === payload.new.id ? payload.new : todo
            )
          );
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "todos",
        },
        (payload) => {
          setTodos((prevTodos) =>
            prevTodos.filter((todo) => todo.id !== payload.old.id)
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });

      if (error) throw error;

      setTodos(data || []);
    } catch (error) {
      console.error("Error fetching todos:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (title) => {
    try {
      const { data, error } = await supabase
        .from("todos")
        .insert([
          {
            title,
            user_id: user.id,
            is_complete: false,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      setTodos((prevTodos) => [...prevTodos, data]);
    } catch (error) {
      console.error("Error adding todo:", error.message);
    }
  };

  const toggleTodo = async (id, isComplete) => {
    try {
      const { data, error } = await supabase
        .from("todos")
        .update({ is_complete: !isComplete })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, is_complete: !isComplete } : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const { error } = await supabase.from("todos").delete().eq("id", id);

      if (error) throw error;

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error.message);
    }
  };

  const updateTodo = async (id, title) => {
    try {
      const { data, error } = await supabase
        .from("todos")
        .update({ title })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? { ...todo, title } : todo))
      );
    } catch (error) {
      console.error("Error updating todo:", error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Todos</h1>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Logout
          </button>
        </div>

        <AddTodo onAdd={addTodo} />

        <div className="mt-8">
          {todos.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No todos
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new todo.
              </p>
            </div>
          ) : (
            <ul className="bg-white shadow overflow-hidden rounded-md divide-y divide-gray-200">
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onUpdate={updateTodo}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
