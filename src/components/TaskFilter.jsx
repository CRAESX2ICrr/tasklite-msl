"use client";

import { useEffect, useState } from "react";

export default function TaskFilter() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [sort, setSort] = useState("newest");

  // dispatch current filters to listeners (TaskList)
  function emitFilters() {
    const detail = {
      q: query.trim(),
      status: status === "All" ? null : status,
      priority: priority === "All" ? null : priority,
      sort,
    };
    window.dispatchEvent(new CustomEvent("taskFilterChange", { detail }));
  }

  useEffect(() => {
    // emit initial filters on mount so TaskList can load with default filters
    emitFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 p-4 bg-white/3 rounded-lg border border-white/10">
      <div className="flex flex-col md:flex-row gap-3 items-center">
        <input
          placeholder="Search title or description..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") emitFilters();
          }}
          className="flex-1 bg-transparent border border-white/20 text-white px-3 py-2 rounded-md"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-black/50 border border-white/20 text-white px-3 py-2 rounded-md"
        >
          <option>All</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="bg-black/50 border border-white/20 text-white px-3 py-2 rounded-md"
        >
          <option>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-black/50 border border-white/20 text-white px-3 py-2 rounded-md"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>

        <div className="flex gap-2">
          <button
            onClick={emitFilters}
            className="px-3 py-2 bg-blue-600/30 hover:bg-blue-600/40 rounded-md border border-white/10"
          >
            Apply
          </button>
          <button
            onClick={() => {
              setQuery("");
              setStatus("All");
              setPriority("All");
              setSort("newest");
              // emit cleared filters after state updates
              setTimeout(emitFilters, 0);
            }}
            className="px-3 py-2 bg-red-600/10 hover:bg-red-600/20 rounded-md border border-white/10"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
