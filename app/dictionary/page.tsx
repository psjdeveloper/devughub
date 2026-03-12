"use client";

import { useState, useEffect } from "react";

interface Result {
  meaning: string;
  fix: string;
}

export default function Dictionary() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query) return;

    try {
      const res = await fetch(`/api/dictionary?query=${query}`);
      if (!res.ok) {
        const errData = await res.json();
        setError(errData.error || "Error fetching data.");
        setResults(null);
      } else {
        const data: Result = await res.json();
        setResults(data);
        setError(null);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch data.");
      setResults(null);
    }
  };

  useEffect(() => {
    if (!query) {
      setResults(null);
      setError(null);
    }
  }, [query]);

  return (
    <div className="text-black bg-white flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Dictionary Search</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter error type (typeError, referenceError, syntaxError)"
          className="border border-gray-400 rounded p-2 w-80"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      <div className="w-80 text-left">
        {error && <p className="text-red-500">{error}</p>}

        {results && (
          <div>
            <h2 className="text-xl font-semibold">Meaning:</h2>
            <p className="mb-2">{results.meaning}</p>
            <h2 className="text-xl font-semibold">Fix:</h2>
            <p>{results.fix}</p>
          </div>
        )}

        {!results && !error && <p>Enter an error type and click Search.</p>}
      </div>
    </div>
  );
}