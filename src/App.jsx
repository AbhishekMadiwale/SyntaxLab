import React, { useMemo, useState, useEffect } from "react";
import snippets from "./data/snippets";
import SnippetCard from "./components/SnippetCard";

function useLocalStorage(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch (e) {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      e();
    }
  }, [key, state]);
  return [state, setState];
}

export default function App() {
  const [query, setQuery] = useState("");
  // practiced is an object {id: {practiced: true, ts: 12345}}
  const [practicedMap, setPracticedMap] = useLocalStorage("practicedMap", {});

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return snippets;
    return snippets.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.short.toLowerCase().includes(q) ||
        s.tags.join(" ").toLowerCase().includes(q)
    );
  }, [query]);

  function togglePracticed(id) {
    setPracticedMap((prev) => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = { practiced: true, ts: Date.now() };
      }
      return next;
    });
  }

  const practicedCount = Object.keys(practicedMap).length;

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "24px auto",
        padding: "0 16px",
        fontFamily: "Inter, system-ui, Arial, sans-serif",
        color: "#111",
      }}
    >
      <header style={{ marginBottom: 20 }}>
        <h1 style={{ margin: "0 0 6px 0", fontSize: 22 }}>Syntax Lab</h1>
        <div style={{ fontSize: 13, color: "#555" }}>
          Search snippets, read examples, mark as practiced.
        </div>
      </header>

      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, tag, or description..."
          style={{
            flex: 1,
            padding: "8px 10px",
            border: "1px solid #ddd",
            borderRadius: 6,
          }}
        />
        <div style={{ fontSize: 13, color: "#333" }}>
          {practicedCount} practiced
        </div>
      </div>

      <main>
        {filtered.length === 0 ? (
          <div style={{ padding: 20, color: "#666" }}>No snippets found.</div>
        ) : (
          filtered.map((s) => (
            <SnippetCard
              key={s.id}
              snippet={s}
              practiced={Boolean(practicedMap[s.id])}
              onToggle={togglePracticed}
            />
          ))
        )}
      </main>
    </div>
  );
}
