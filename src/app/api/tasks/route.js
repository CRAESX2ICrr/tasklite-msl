
import { NextResponse } from "next/server";                                           //return JSON responses from API routes
import { query } from "@/lib/db";

// GET — List all tasks
export async function GET(request) {
  try {
    const url = new URL(request.url);                                                 // conv incoming HTP req URL into a URL obj so read parameters
    const q = url.searchParams.get("q")?.trim();
    const status = url.searchParams.get("status");
    const priority = url.searchParams.get("priority");
    const sort = url.searchParams.get("sort") || "newest";

    const conditions = [];                                                            //Prep WHERE parts + parameter array
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

    // Sorting
    let orderBy = "id";
    let orderDirection = "DESC";

    if (sort === "oldest") {
      orderDirection = "ASC";
    }

    if (sort === "title_asc") {
      orderBy = "title";
      orderDirection = "ASC";
    }

    if (sort === "title_desc") {
      orderBy = "title";
      orderDirection = "DESC";
    }

    //const sql = `SELECT * FROM tasks ${where} ORDER BY ${orderBy} ${orderDirection}`;
    const sql = `
      SELECT * FROM tasks 
      ${where}
      ORDER BY 
        (status = 'Done') ASC,
        ${orderBy} ${orderDirection}`;


    const [rows] = await query(sql, params);                                            // returns an array: [rows, fields].
    return NextResponse.json({ tasks: rows });                                          // rows back to the frontend as JSON under the "tasks" key. // NextResponse.json formats the data into a proper HTTP JSON response.
  } catch (err) {
    console.error("GET /tasks error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


// POST — Add a new task
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
  } 
  
  catch (err) {
    console.error("POST /tasks error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
