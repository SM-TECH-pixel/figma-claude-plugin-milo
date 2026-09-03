figma.showUI(__html__, { width: 520, height: 460, title: "Figma Script Runner" });

figma.ui.onmessage = async (msg) => {
  if (msg.type === "resize") {
    figma.ui.resize(msg.width, msg.height);
    return;
  }

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

  if (msg.type === "take-screenshot") {
    try {
      const node = figma.currentPage.selection[0] || figma.currentPage;
      const bytes = await node.exportAsync({ format: "PNG", constraint: { type: "SCALE", value: 2 } });
      let binary = "";
      for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
      const base64 = btoa(binary);
      await fetch("http://localhost:3333/screenshot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64, name: node.name }),
      });
      figma.ui.postMessage({ type: "screenshot-done", name: node.name });
    } catch (err) {
      figma.ui.postMessage({ type: "screenshot-error", error: err.message });
    }
    return;
  }

  if (msg.type === "screenshot-all-frames") {
    const pageName = msg.page || figma.currentPage.name;
    const page = figma.root.children.find(p => p.name === pageName) || figma.currentPage;
    try {
      await figma.setCurrentPageAsync(page);
    } catch(e) {}
    const frames = page.children.filter(n => n.type === "FRAME");
    const byName = {};
    frames.forEach(f => {
      if (!byName[f.name] || f.x > byName[f.name].x) byName[f.name] = f;
    });
    const toExport = Object.values(byName);
    figma.ui.postMessage({ type: "screenshot-all-start", total: toExport.length });
    for (const node of toExport) {
      try {
        const bytes = await node.exportAsync({ format: "PNG", constraint: { type: "WIDTH", value: 1440 } });
        let binary = "";
        for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
        const base64 = btoa(binary);
        const safeName = node.name.trim().replace(/[^a-zA-Z0-9_\-]/g, "_");
        await fetch("http://localhost:3333/screenshot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ base64, name: safeName }),
        });
        figma.ui.postMessage({ type: "screenshot-all-progress", name: node.name, ok: true });
      } catch (err) {
        figma.ui.postMessage({ type: "screenshot-all-progress", name: node.name, ok: false, error: err.message });
      }
    }
    figma.ui.postMessage({ type: "screenshot-all-done", total: toExport.length });
    return;
  }
};
