import React from "react";
import InlinePractice from "./InlinePractice";

export default function SnippetCard({ snippet, practiced, onToggle }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "12px",
        borderRadius: 6,
        marginBottom: 10,
        background: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0, fontSize: 16 }}>{snippet.title}</h3>
        <button
          onClick={() => onToggle(snippet.id)}
          style={{
            padding: "6px 8px",
            fontSize: 13,
            borderRadius: 4,
            border: "1px solid #ccc",
            background: practiced ? "#e6ffed" : "#fff",
          }}
        >
          {practiced ? "Practiced" : "Mark practiced"}
        </button>
      </div>

      <div style={{ fontSize: 13, color: "#333", marginTop: 6 }}>
        {snippet.short}
      </div>

      {/* Inline typing practice area */}
      <InlinePractice snippetId={snippet.id} text={snippet.example} />

      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          marginTop: 6,
        }}
      >
        {snippet.tags.map((t) => (
          <span
            key={t}
            style={{
              fontSize: 12,
              padding: "4px 6px",
              border: "1px solid #eee",
              borderRadius: 4,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
