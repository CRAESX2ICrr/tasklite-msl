"use client";
import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return alert("Task title required");

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, priority }),
      });

      if (!res.ok) throw new Error("Failed to add task");

      setTitle("");
      setDescription("");
      setPriority("Medium");

      if (onAdd) onAdd();
    } catch (err) {
      console.error(err);
      alert("Something went wrong while adding the task!");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl mx-auto p-6 backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl flex flex-col md:flex-row md:items-center gap-4 transition-all hover:bg-white/15"
    >
      {/* Task Title */}
      <input
        type="text"
        placeholder="Task title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 bg-transparent border border-white/30 text-white placeholder:text-white/60 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40 transition"
        required
      />

      {/* Description */}
      <input
        type="text"
        placeholder="Description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="flex-1 bg-transparent border border-white/30 text-white placeholder:text-white/60 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40 transition"
      />

      {/* Priority (inline label without breaking layout) */}
      <div className="relative">
        <label className="absolute -top-2 left-2 text-xs text-white/60 bg-black/50 px-1 rounded">
          Priority
        </label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="bg-transparent border border-white/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40 transition appearance-none"
        >
          <option value="Low" className="text-black">Low</option>
          <option value="Medium" className="text-black">Medium</option>
          <option value="High" className="text-black">High</option>
        </select>
      </div>

      {/* Add Button */}
      <button
        type="submit"
        className="px-6 py-3 bg-gradient-to-r from-black to-gray-800 text-white font-semibold rounded-lg shadow-md hover:scale-[1.03] hover:shadow-lg transition-transform"
      >
        Add Task
      </button>
    </form>
  );
}
