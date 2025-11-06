import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// 🟢 GET — List all tasks
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const q = url.searchParams.get("q")?.trim();
    const status = url.searchParams.get("status");
    const priority = url.searchParams.get("priority");
    const sort = url.searchParams.get("sort") || "newest";

    const conditions = [];
    const params = [];

    if (q) {
      conditions.push("(title LIKE ? OR description LIKE ?)");
      params.push(`%${q}%`, `%${q}%`);
    }
    if (status) {
      conditions.push("status = ?");
      params.push(status);
    }
    if (priority) {
      conditions.push("priority = ?");
      params.push(priority);
    }

    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
    const order = sort === "oldest" ? "ASC" : "DESC";
    const sql = `SELECT * FROM tasks ${where} ORDER BY id ${order}`;

    const [rows] = await query(sql, params);
    return NextResponse.json({ tasks: rows });
  } catch (err) {
    console.error("GET /tasks error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// 🟡 POST — Add a new task
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      title,
      description = "",
      status = "Pending",
      priority = "Medium",
    } = body;

    if (!title || !title.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const [result] = await query(
      "INSERT INTO tasks (title, description, status, priority) VALUES (?, ?, ?, ?)",
      [title, description, status, priority]
    );

    const [rows] = await query("SELECT * FROM tasks WHERE id = ?", [result.insertId]);
    return NextResponse.json({ task: rows[0] }, { status: 201 });
  } catch (err) {
    console.error("POST /tasks error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
