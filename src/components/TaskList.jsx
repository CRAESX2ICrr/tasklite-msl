"use client";

import { useEffect } from "react";
import { useTasks } from "@/hooks/useTasks";
import TaskRow from "./TaskRow"; 

export default function TaskList() {
  const { tasks, loadTasks, updateTask, deleteTask } = useTasks();

  // Listen for filters
  useEffect(() => {
    function onFilter(e) {
      loadTasks(e.detail || {});
    }
    window.addEventListener("taskFilterChange", onFilter);
    return () => window.removeEventListener("taskFilterChange", onFilter);
  }, [loadTasks]);

  // Listen for reload events
  useEffect(() => {
    function reload() {
      loadTasks();
    }
    window.addEventListener("reloadTasks", reload);
    return () => window.removeEventListener("reloadTasks", reload);
  }, [loadTasks]);

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
          {tasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
