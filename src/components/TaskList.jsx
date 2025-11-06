"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, Save, X } from "lucide-react";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    // listen for filter changes dispatched by TaskFilter
    function onFilter(e) {
      const filters = e.detail || {};
      loadTasks(filters);
    }
    window.addEventListener("taskFilterChange", onFilter);
    return () => window.removeEventListener("taskFilterChange", onFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadTasks(filters = {}) {
    try {
      // build query string from filters
      const params = new URLSearchParams();
      if (filters.q) params.set("q", filters.q);
      if (filters.status) params.set("status", filters.status);
      if (filters.priority) params.set("priority", filters.priority);
      if (filters.sort) params.set("sort", filters.sort);
      const url = "/api/tasks" + (Array.from(params).length ? `?${params.toString()}` : "");
      const res = await fetch(url);
      const json = await res.json();
      setTasks(json.tasks || []);
    } catch (err) {
      console.error("Failed to load tasks", err);
    }
  }

  function startEdit(task) {
    setEditingId(task.id);
    setEditTitle(task.title || "");
    setEditDescription(task.description || "");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  }

  async function saveEdit(id) {
    setLoading(true);
    try {
      const task = tasks.find((t) => t.id === id);
      const payload = { title: editTitle, description: editDescription, completed: task.completed ? 1 : 0 };
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const text = await res.text();
      let json;
      try {
        json = text ? JSON.parse(text) : {};
      } catch (parseErr) {
        console.error('Failed to parse JSON from PUT response', parseErr, text);
        json = { error: text };
      }
      if (!res.ok) {
        console.error('PUT /api/tasks/' + id + ' failed', res.status, json);
        throw new Error(json.error || `Save failed (${res.status})`);
      }
      // success
      // prefer returned task if present
      // json may be { task: {...} }
      
      // assign json.task if available
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id
            ? json.task || { ...t, title: editTitle, description: editDescription }
            : t
        )
      );
      cancelEdit();
    } catch (err) {
      console.error(err);
      alert("Failed to save task: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  }

  async function deleteTask(id) {
    if (!confirm("Delete this task?")) return;
    // defensive check & debug log
    if (id === null || id === undefined) {
      const msg = "Missing task ID";
      console.error(msg);
      alert("Failed to delete task: " + msg);
      return;
    }

    console.log("deleteTask called with id:", id);

    try {
      const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
      const text = await res.text();
      let json;
      try {
        json = text ? JSON.parse(text) : {};
      } catch (parseErr) {
        console.error('Failed to parse JSON from DELETE response', parseErr, text);
        json = { error: text };
      }
      if (!res.ok) {
        console.error('DELETE /api/tasks/' + id + ' failed', res.status, json);
      
        throw new Error(json.error || text || `Delete failed (${res.status})`);
      }
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete task: " + (err.message || err));
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl shadow-lg overflow-hidden">
      <table className="w-full text-sm md:text-base text-white">
        <thead className="bg-white/5 border-b border-white/10">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Priority</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Created At</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((t) => (
            <tr key={t.id} className="border-t border-white/10 hover:bg-white/5 transition">
              {/* Title */}
              <td className="p-3 font-semibold">
                {editingId === t.id ? (
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="bg-transparent border border-white/20 text-white px-2 py-1 rounded-md w-full"
                  />
                ) : (
                  t.title
                )}
              </td>

              {/* Description */}
              <td className="p-3 text-gray-300">
                {editingId === t.id ? (
                  <input
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="bg-transparent border border-white/20 text-white px-2 py-1 rounded-md w-full"
                  />
                ) : (
                  t.description || "—"
                )}
              </td>

              {/* Priority Dropdown */}
              <td className="p-3">
                <select
                  defaultValue={t.priority}
                  className="bg-black/50 border border-white/30 text-white px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  <option value="Low" className="text-black">
                    Low
                  </option>
                  <option value="Medium" className="text-black">
                    Medium
                  </option>
                  <option value="High" className="text-black">
                    High
                  </option>
                </select>
              </td>

              {/* Status Dropdown */}
              <td className="p-3">
                <select
                  defaultValue={t.status}
                  className="bg-black/50 border border-white/30 text-white px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  <option value="Pending" className="text-black">
                    Pending
                  </option>
                  <option value="In Progress" className="text-black">
                    In Progress
                  </option>
                  <option value="Done" className="text-black">
                    Done
                  </option>
                </select>
              </td>

              {/* Created At */}
              <td className="p-3 text-gray-400">{t.created_at}</td>

              {/* Action Buttons */}
              <td className="p-3 text-center flex justify-center gap-3">
                {editingId === t.id ? (
                  <>
                    <button
                      className="p-2 rounded-md bg-green-600/20 hover:bg-green-600/30 border border-white/10 transition"
                      title="Save"
                      onClick={() => saveEdit(t.id)}
                      disabled={loading}
                    >
                      <Save size={16} className="text-green-300" />
                    </button>
                    <button
                      className="p-2 rounded-md bg-red-600/10 hover:bg-red-600/20 border border-white/10 transition"
                      title="Cancel"
                      onClick={cancelEdit}
                    >
                      <X size={16} className="text-white/80" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="p-2 rounded-md bg-white/10 hover:bg-white/20 border border-white/10 transition"
                      title="Edit Task"
                      onClick={() => startEdit(t)}
                    >
                      <Pencil size={16} className="text-yellow-400" />
                    </button>
                    <button
                      className="p-2 rounded-md bg-white/10 hover:bg-white/20 border border-white/10 transition"
                      title="Delete Task"
                      onClick={() => deleteTask(t.id)}
                    >
                      <Trash2 size={16} className="text-red-400" />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
