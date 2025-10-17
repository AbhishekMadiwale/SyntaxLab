import React, { useState, useEffect, useRef } from "react";

export default function InlinePractice({ snippetId, text }) {
  const [input, setInput] = useState(() => {
    try {
      return localStorage.getItem("typed_" + snippetId) || "";
    } catch {
      return "";
    }
  });

  const [output, setOutput] = useState(""); // output cleared on reload
  const iframeRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("typed_" + snippetId, input);
  }, [input, snippetId]);

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= text.length + 200) {
      setInput(value);
    }
  };

  const rendered = text.split("").map((char, i) => {
    const typedChar = input[i];
    let color = "#aaa";
    if (typedChar !== undefined) {
      color = typedChar === char ? "#222" : "red";
    }
    return (
      <span key={i} style={{ color: color, whiteSpace: "pre" }}>
        {char}
      </span>
    );
  });

  const isComplete = input.trim() === text.trim();

  const runCode = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const html = `
      <html><body>
      <script>
        const send = (type, msg) => parent.postMessage({ type, msg, id: "${snippetId}" }, '*');
        const log = (...args) => send('log', args.join(' '));
        const error = (err) => send('error', err.toString());
        console.log = log;
        console.error = error;
        window.onerror = (msg) => error(msg);
        try {
          ${input}
        } catch(e) { error(e); }
      </script>
      </body></html>
    `;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    iframe.src = url;
    setOutput("");
  };

  const clearOutput = () => setOutput("");

  useEffect(() => {
    const listener = (e) => {
      const data = e.data;
      if (!data || data.id !== snippetId) return;
      if (data.type === "log") setOutput((prev) => prev + data.msg + "\n");
      if (data.type === "error")
        setOutput((prev) => prev + "❌ " + data.msg + "\n");
    };
    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, [snippetId]);

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 6,
        padding: 15,
        marginTop: 6,
        background: isComplete ? "#e6ffed" : "#f7f7f7",
        fontFamily: "monospace",
        fontSize: 18,
      }}
    >
      <div style={{ marginBottom: 6 }}>{rendered}</div>

      <textarea
        value={input}
        onChange={handleChange}
        spellCheck="false"
        placeholder="Type the code here..."
        style={{
          width: "100%",
          marginTop: 30,
          height: 150,
          border: "1px solid #ddd",
          borderRadius: 4,
          padding: 20,
          fontFamily: "monospace",
          fontSize: 18,
          resize: "vertical",
          background: "#fff",
          outline: "none",
        }}
      />

      <div
        style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 20 }}
      >
        <button
          onClick={runCode}
          style={{
            padding: "6px 10px",
            border: "1px solid #ccc",
            borderRadius: 4,
            background: "#fff",
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          ▶ Run
        </button>
        <button
          onClick={clearOutput}
          style={{
            padding: "6px 10px",
            border: "1px solid #ccc",
            borderRadius: 4,
            background: "#fff",
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          ✖ Clear Output
        </button>
        <span style={{ fontSize: 18, color: "#555" }}>
          {isComplete ? "✅ All correct!" : "Type exactly, then click Run"}
        </span>
      </div>

      <pre
        style={{
          background: "#111",
          color: "#0f0",
          minHeight: 60,
          marginTop: 20,
          padding: 10,
          fontSize: 18,
          borderRadius: 4,
          whiteSpace: "pre-wrap",
        }}
      >
        {output || "Output will appear here..."}
      </pre>

      <iframe
        ref={iframeRef}
        sandbox="allow-scripts"
        title={"sandbox-" + snippetId}
        style={{ display: "none" }}
      />
    </div>
  );
}
