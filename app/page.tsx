"use client";

import { useState } from "react";

export default function Home() {
  const [error, setError] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [githubResults, setGithubResults] = useState<any[]>([]);

  const searchError = async () => {
    // StackOverflow API
    const res = await fetch(`/api/search?query=${error}`);
    const data = await res.json();
    setResults(data.items || []);

    // GitHub API
    const githubRes = await fetch(`/api/github?query=${error}`);
    const githubData = await githubRes.json();
    setGithubResults(githubData.items || []);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-10">

      <h1 className="text-4xl font-bold text-gray-800 mb-6 hover:animate-pulse">
        DebugHub
      </h1>

      {/* Search Card */}
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-xl">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Paste your error here..."
            value={error}
            onChange={(e) => setError(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
          <button
            onClick={searchError}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            Search
          </button>
        </div>
      </div>

      {/* StackOverflow Results */}
      {results.length > 0 && (
        <div className="mt-8 w-full max-w-2xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            StackOverflow Results
          </h2>
          <ul className="space-y-4">
            {results.map((item) => (
              <li
                key={item.question_id}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-medium hover:underline"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* GitHub Results */}
      {githubResults.length > 0 && (
        <div className="mt-8 w-full max-w-2xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            GitHub Issues
          </h2>
          <ul className="space-y-3">
            {githubResults.slice(0, 5).map((item) => (
              <li
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <a
                  href={item.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
<a href="/dictionary" className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition animate-pulse text-black">View Dictionary</a>
    </main>
  );
}