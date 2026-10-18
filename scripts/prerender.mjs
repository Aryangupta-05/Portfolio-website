import { readFile, writeFile } from "node:fs/promises";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";

// Search engines and visitors without JavaScript get the same complete content.
// Interactive filters, navigation, and copy-email hydrate in the browser.
const server = await createServer({
  server: { middlewareMode: true, hmr: false },
  optimizeDeps: { noDiscovery: true, include: [] },
  appType: "custom",
});
try {
  const { default: App } = await server.ssrLoadModule("/src/App.jsx");
  const template = await readFile("dist/index.html", "utf8");
  const markup = renderToString(createElement(App));
  if (!template.includes('<div id="root"></div>'))
    throw new Error("Root placeholder missing");
  await writeFile(
    "dist/index.html",
    template.replace('<div id="root"></div>', `<div id="root">${markup}</div>`),
  );
  console.log(
    "Prerendered portfolio: full project, experience, and contact content in HTML.",
  );
} finally {
  await server.close();
}
