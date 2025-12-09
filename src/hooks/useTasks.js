// src/util/useTasks.js
"use client";
import { useEffect, useState } from "react";
import { exportToCSV } from "@/lib/exportToCSV";

export function useTasks() {
  const [tasks, setTasks] = useState([]);                                 //store list of tsk mem, func-change tsk. reac st var
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //
  // Fetch tasks 
  //
  async function loadTasks(filters = {}) {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (filters.q) params.set("q", filters.q);
      if (filters.status) params.set("status", filters.status);
      if (filters.priority) params.set("priority", filters.priority);
      if (filters.sort) params.set("sort", filters.sort);

      const url = "/api/tasks" + (params.toString() ? `?${params}` : "");
      const res = await fetch(url);                                                   //fet tsk from backend
      if (!res.ok) throw new Error(`Failed to fetch tasks (${res.status})`);

      const data = await res.json();                                                  //parse json resp
      setTasks(data.tasks || []);                                                     //upd state w/ fecthd tsk
    } 
    
    catch (err) {
      console.error("Error loading tasks:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  //
  // Update a task 
  //
async function updateTask(id, updates) {
  try {
    const current = tasks.find(t => t.id === id);
    if (!current) throw new Error("Task not found");

    const payload = {
      title: current.title,
      description: current.description,
      priority: current.priority,
      status: current.status,
      ...updates,
    };

    const res = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    let json = {};
    try {
      json = text ? JSON.parse(text) : {};
    } catch {
      json = { task: null };
    }

    if (!res.ok) throw new Error(json.error || text || "Update failed");

    await loadTasks();                                                        // reload full task

    return true;
  } catch (err) {
    console.error("Update failed:", err);
    alert("Failed to update task: " + err.message);
    return false;
  }
}


  //
  // Delete task
  //
  async function deleteTask(id) {
    try {
      const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
      const text = await res.text();
      let json;
      try {
        json = text ? JSON.parse(text) : {};
      } catch {
        json = { error: text };
      }

      if (!res.ok) {
        throw new Error(json.error || text || `Delete failed (${res.status})`);
      }

      setTasks((prev) => prev.filter((t) => t.id !== id));
      return true;
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete task: " + err.message);
      return false;
    }
  }

  //
  // Export CSV
  //
  function exportTasksCSV() {
    exportToCSV(tasks);
  }

  //
  // Load tasks on mount
  //
  useEffect(() => {
    loadTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    loadTasks,
    updateTask,
    deleteTask,
    exportTasksCSV,
    setTasks, 
  };
}
