figma.showUI(__html__, { width: 520, height: 460, title: "Mothership Script Runner" });

figma.ui.onmessage = async (msg) => {
  if (msg.type === "run-script") {
    try {
      const fn = new Function("figma", msg.script);
      const result = await fn(figma);
      figma.ui.postMessage({
        type: "script-result",
        success: true,
        output: result !== undefined ? String(result) : "(no return value)",
      });
    } catch (err) {
      figma.ui.postMessage({
        type: "script-result",
        success: false,
        error: err instanceof Error ? err.message : String(err),
      });
    }
    return;
  }

  if (msg.type === "post-output") {
    try {
      await fetch("http://localhost:3333/output", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(msg.payload),
      });
    } catch (err) {
      console.error("Failed to POST /output:", err.message);
    }
    return;
  }

  if (msg.type === "post-screenshot") {
    try {
      await fetch("http://localhost:3333/screenshot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64: msg.base64 }),
      });
    } catch (err) {
      console.error("Failed to POST /screenshot:", err.message);
    }
    return;
  }
};
