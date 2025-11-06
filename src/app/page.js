"use client";

import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import TaskFilter from "@/components/TaskFilter";
import { useTasks } from "@/util/useTasks";

export default function Home() {
  const { tasks, loadTasks, exportTasksCSV, loading } = useTasks();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-start px-6 py-10 space-y-8">
        <h1 className="text-2xl font-semibold mb-2">Welcome To TaskLite</h1>

        {/* Add Task + Filters */}
        <TaskForm onAdd={loadTasks} />
        <TaskFilter onFilter={loadTasks} />

        {/* Task List */}
        <TaskList />

        {/* CSV Export - Bottom Section */}
        <div className="flex justify-center w-full max-w-4xl mt-8">
          <button
            onClick={exportTasksCSV}
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform"
            disabled={loading}
          >
            {loading ? "Preparing CSV..." : "Export Tasks as CSV"}
          </button>
        </div>
      </main>
    </div>
  );
}
