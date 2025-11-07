"use client";
import { useState } from "react";
import { Save, X, Pencil, Trash2 } from "lucide-react";

export default function TaskRow({ task, updateTask, deleteTask }) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  function startEdit() {
    setEditing(true);
    setEditTitle(task.title || "");
    setEditDescription(task.description || "");
  }

  function cancelEdit() {
    setEditing(false);
  }

  async function saveEdit() {
    const ok = await updateTask(task.id, {
      title: editTitle,
      description: editDescription,
      completed: task.completed ? 1 : 0,
    });

    if (ok) setEditing(false);
  }

  function handleFieldChange(field, value) {
    updateTask(task.id, { [field]: value });
  }

  return (
    <tr className="border-t border-white/10 hover:bg-white/5 transition">

      {/* Title */}
      <td className="p-3 font-semibold">
        {editing ? (
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="bg-transparent border border-white/20 text-white px-2 py-1 rounded-md w-full"
          />
        ) : (
          task.title
        )}
      </td>

      {/* Description */}
      <td className="p-3 text-gray-300">
        {editing ? (
          <input
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="bg-transparent border border-white/20 text-white px-2 py-1 rounded-md w-full"
          />
        ) : (
          task.description || "—"
        )}
      </td>

      {/* Priority */}
      <td className="p-3">
        <select
          value={task.priority}
          onChange={(e) => handleFieldChange("priority", e.target.value)}
          className="bg-black/50 border border-white/30 text-white px-2 py-1 rounded-md"
        >
          <option value="Low" className="text-black">Low</option>
          <option value="Medium" className="text-black">Medium</option>
          <option value="High" className="text-black">High</option>
        </select>
      </td>

      {/* Status */}
      <td className="p-3">
        <select
          value={task.status}
          onChange={(e) => handleFieldChange("status", e.target.value)}
          className="bg-black/50 border border-white/30 text-white px-2 py-1 rounded-md"
        >
          <option value="Pending" className="text-black">Pending</option>
          <option value="In Progress" className="text-black">In Progress</option>
          <option value="Done" className="text-black">Done</option>
        </select>
      </td>

      {/* Created At */}
      <td className="p-3 text-gray-400">{task.created_at}</td>

      {/* Actions */}
      <td className="p-3 text-center flex justify-center gap-3">
        {editing ? (
          <>
            <button
              className="p-2 rounded-md bg-green-600/20 hover:bg-green-600/30 border border-white/10 transition"
              onClick={saveEdit}
            >
              <Save size={16} className="text-green-300" />
            </button>
            <button
              className="p-2 rounded-md bg-red-600/10 hover:bg-red-600/20 border border-white/10 transition"
              onClick={cancelEdit}
            >
              <X size={16} className="text-white/80" />
            </button>
          </>
        ) : (
          <>
            <button
              className="p-2 rounded-md bg-white/10 hover:bg-white/20 border border-white/10 transition"
              onClick={startEdit}
            >
              <Pencil size={16} className="text-yellow-400" />
            </button>
            <button
              className="p-2 rounded-md bg-white/10 hover:bg-white/20 border border-white/10 transition"
              onClick={() => deleteTask(task.id)}
            >
              <Trash2 size={16} className="text-red-400" />
            </button>
          </>
        )}
      </td>

    </tr>
  );
}
