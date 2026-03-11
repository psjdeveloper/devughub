"use client";

import { useState } from "react";
import { errors } from "./data/error";
import { mdnLinks } from "./data/mdn";

export default function Home() {
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);
  const [githubResults, setGithubResults] = useState([]);

  const searchError = async () => {
    // Your own explanation
    const explanation = errors[error] || null;

    // StackOverflow
    const res = await fetch(`/api/search?query=${error}`);
    const data = await res.json();
    setResults(data.items || []);

    // GitHub
    const githubRes = await fetch(`/api/github?query=${error}`);
    const githubData = await githubRes.json();
    setGithubResults(githubData.items || []);

    // Save explanation for UI
    setExplanation(explanation);
  };

  const [explanation, setExplanation] = useState(null);

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

      {/* Custom Explanation */}
      {explanation && (
        <div className="mt-6 bg-white rounded-lg shadow p-4 max-w-xl w-full">
          <h2 className="text-black text-xl font-semibold mb-2">Explanation</h2>
          <p className="text-gray-700 mb-2">{explanation.meaning}</p>
          <p className="text-gray-800 font-medium">Fix: {explanation.fix}</p>
          {mdnLinks[error] && (
            <a
              href={mdnLinks[error]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline mt-2 block"
            >
              Official MDN Documentation
            </a>
          )}
        </div>
      )}

      {/* StackOverflow Results */}
      <div className="mt-8 w-full max-w-2xl">
        {results.length > 0 && (
          <>
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
          </>
        )}
      </div>

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

    </main>
  );
}