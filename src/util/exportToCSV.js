// src/util/exportToCSV.js
export function exportToCSV(tasks, filename = "tasks_export.csv") {
  if (!tasks || tasks.length === 0) {
    alert("No tasks to export!");
    return;
  }

  const headers = ["ID", "Title", "Description", "Status", "Priority", "Created At"];
  const rows = tasks.map((t) => [
    t.id,
    `"${(t.title || "").replace(/"/g, '""')}"`,
    `"${(t.description || "").replace(/"/g, '""')}"`,
    t.status || "",
    t.priority || "",
    t.created_at || "",
  ]);

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute(
    "download",
    `${filename.replace(".csv", "")}_${new Date().toISOString().split("T")[0]}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
