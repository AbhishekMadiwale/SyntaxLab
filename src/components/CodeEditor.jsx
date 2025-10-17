import React, { useRef, useState, useEffect } from "react";

export default function CodeEditor({ snippetId, starterCode }) {
  const iframeRef = useRef(null);
  const [code, setCode] = useState(() => {
    try {
      const saved = localStorage.getItem("code_" + snippetId);
      return saved || starterCode || "";
    } catch {
      return starterCode || "";
    }
  });
  const [output, setOutput] = useState("");

  useEffect(() => {
    localStorage.setItem("code_" + snippetId, code);
  }, [code, snippetId]);

  const runCode = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const html = `
      <html>
      <body>
        <script>
          const log = (...args) => parent.postMessage(
            { type: 'log', message: args.join(' ') },
            '*'
          );
          const error = (err) => parent.postMessage(
            { type: 'error', message: err.toString() },
            '*'
          );
          console.log = log;
          console.error = error;
          window.onerror = (msg) => error(msg);
          try {
            ${code}
          } catch(e) { error(e); }
        </script>
      </body>
      </html>
    `;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    iframe.src = url;
    setOutput("");
  };

  useEffect(() => {
    const listener = (event) => {
      if (!event.data) return;
      if (event.data.type === "log") {
        setOutput((prev) => prev + event.data.message + "\n");
      } else if (event.data.type === "error") {
        setOutput((prev) => prev + "❌ " + event.data.message + "\n");
      }
    };
    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, []);

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 6, marginTop: 8 }}>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{
          width: "100%",
          height: 120,
          border: "none",
          borderBottom: "1px solid #eee",
          padding: 8,
          fontFamily: "monospace",
          fontSize: 13,
          outline: "none",
          resize: "vertical",
        }}
      />
      <div
        style={{ display: "flex", gap: 8, alignItems: "center", padding: 80 }}
      >
        <button
          onClick={runCode}
          style={{
            padding: "6px 10px",
            borderRadius: 4,
            border: "1px solid #ccc",
            background: "#f9f9f9",
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          ▶ Run
        </button>
        <span style={{ fontSize: 12, color: "#555" }}>
          Output appears below
        </span>
      </div>
      <pre
        style={{
          background: "#111",
          color: "hsla(101, 93%, 54%, 1.00)",
          minHeight: 60,
          margin: 0,
          padding: 8,
          fontSize: 12,
          overflowX: "auto",
          whiteSpace: "pre-wrap",
        }}
      >
        {output}
      </pre>
      {/* Hidden iframe sandbox */}
      <iframe
        ref={iframeRef}
        sandbox="allow-scripts"
        style={{ display: "none" }}
        title={`sandbox-${snippetId}`}
      />
    </div>
  );
}
