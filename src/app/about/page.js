export default function AboutPage() {
	return (
		<main className="flex-1 flex flex-col items-center px-6 py-24 text-white">
			<div className="w-full max-w-4xl space-y-6 text-center">
				<h1 className="text-4xl font-extrabold">About TaskLite</h1>

				<p className="text-lg text-white/90">
					TaskLite is a lightweight task manager built with Next.js and Tailwind CSS.
					It demonstrates a small full-stack app with API routes, a database helper,
					and client components for creating and managing tasks.
				</p>

				<section className="p-6 rounded-lg bg-white/5 backdrop-blur-sm">
					<h2 className="text-2xl font-semibold text-white">Features</h2>
					<ul className="mt-3 text-left list-disc list-inside space-y-2 text-white/80">
						<li>Add, edit and delete tasks</li>
						<li>Filter and search tasks</li>
						<li>Persistent storage via MySQL (configure in <code className="px-1 py-0.5 bg-white/10 rounded">.env.local</code>)</li>
						<li>Responsive layout and optional particle background</li>
					</ul>
				</section>

				<section className="p-6 rounded-lg">
					<h3 className="text-xl font-medium text-white">Run locally</h3>
					<ol className="mt-2 text-left list-decimal list-inside space-y-1 text-white/80">
						<li>Install dependencies: <code className="px-1 py-0.5 bg-white/10 rounded">npm install</code></li>
						<li>Set DB credentials in <code className="px-1 py-0.5 bg-white/10 rounded">.env.local</code></li>
						<li>Start dev server: <code className="px-1 py-0.5 bg-white/10 rounded">npm run dev</code></li>
					</ol>
				</section>

				<footer className="pt-6 text-sm text-white/80">
					<p>
						Click <strong>Home</strong> in the header to return to the task list.
					</p>
				</footer>
			</div>
		</main>
	)
}

