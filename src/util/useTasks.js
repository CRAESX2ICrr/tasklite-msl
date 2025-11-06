// src/util/useTasks.js
"use client";
import { useEffect, useState } from "react";
import { exportToCSV } from "@/util/exportToCSV";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //Fetch all tasks (with optional filters)
  async function loadTasks(filters = {}) {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams(filters).toString();
      const res = await fetch(`/api/tasks?${params}`);
      if (!res.ok) throw new Error(`Failed to fetch tasks (${res.status})`);
      const data = await res.json();
      setTasks(data.tasks || []);
    } catch (err) {
      console.error("Error loading tasks:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Reload on mount
  useEffect(() => {
    loadTasks();
  }, []);

  // Export current tasks to CSV
  function exportTasksCSV() {
    exportToCSV(tasks);
  }

  return {
    tasks,
    loading,
    error,
    loadTasks,
    exportTasksCSV,
  };
}
