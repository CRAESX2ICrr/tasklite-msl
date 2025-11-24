export default function AboutPage() {
  return (
    <main className="flex-1 flex flex-col items-center px-6 py-24 text-white animate-fadeIn">
      <div className="w-full max-w-3xl space-y-10 text-center">

        {/* Title */}
        <h1 className="text-5xl font-extrabold tracking-tight drop-shadow-lg">
          About <span className="text-yellow-400">TaskLite</span>
        </h1>

        {/* Intro */}
        <p className="text-lg text-white/80 leading-relaxed">
          TaskLite is a lightweight and fast task management app built using modern 
          web technologies like <strong>Next.js</strong>, <strong>React</strong>, and <strong>MySQL</strong>. 
          It showcases a full-stack workflow including API routes, database integration, 
          and interactive UI components.
        </p>

        {/* Features */}
        <section className="p-6 rounded-xl bg-white/5 border border-white/10 shadow-lg backdrop-blur-md">
          <h2 className="text-2xl font-semibold text-yellow-300 mb-4">Features</h2>

          <ul className="text-left list-disc list-inside space-y-2 text-white/80">
            <li>Add, edit, update, and delete tasks</li>
            <li>Search and filter tasks by status, priority, and title</li>
            <li>Sorted results (Newest, Oldest, A–Z, Z–A, Pushes Done at bottom)</li>
            <li>CSV export for saving your tasks</li>
            <li>Persistent storage via MySQL</li>
            <li>Particle background from reactbits</li>
          </ul>
        </section>

        {/* Tech Stack */}
        <section className="p-6 rounded-xl bg-white/5 border border-white/10 shadow-lg backdrop-blur-md">
          <h2 className="text-xl font-semibold text-purple-300 mb-3">Tech Stack</h2>

          <ul className="text-left list-disc list-inside space-y-2 text-white/80">
            <li>Next.js App Router</li>
            <li>React (client components + hooks)</li>
            <li>MySQL with mysql2/promise</li>
            <li>Tailwind CSS</li>
            <li>Lucide Icons</li>
            <li>Railway (database hosting)</li>
          </ul>
        </section>

        {/* Instructions */}
        <section className="p-6 rounded-xl bg-white/5 border border-white/10 shadow-lg backdrop-blur-md">
          <h3 className="text-xl font-semibold text-green-300">Run Locally</h3>
          <ol className="mt-3 text-left list-decimal list-inside space-y-1 text-white/80">
            <li>Install dependencies: <code className="bg-white/10 px-2 py-0.5 rounded">npm install</code></li>
            <li>Set DB credentials in <code className="bg-white/10 px-1 py-0.5 rounded">.env.local</code></li>
            <li>Start dev server: <code className="bg-white/10 px-2 py-0.5 rounded">npm run dev</code></li>
          </ol>
        </section>

        {/* Footer */}
        <footer className="pt-2 text-sm text-white/60">
          <p>
            Return to{" "}
            <a
              href="/"
              className="text-blue-300 hover:text-blue-400 underline transition"
            >
              Home
            </a>
          </p>
        </footer>

      </div>
    </main>
  );
}
