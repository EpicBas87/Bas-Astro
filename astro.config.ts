import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import { viteStaticCopy } from "vite-plugin-static-copy";
import path from "node:path";

export default defineConfig({
  output: "server",
  adapter: cloudflare({
    platformProxy: { enabled: true },
  }),
  integrations: [react(), tailwind({ applyBaseStyles: false })],
  vite: {
    resolve: { alias: { "@": path.resolve("./src") } },
    plugins: [
      viteStaticCopy({
        targets: [
          { src: `${epoxyPath}/**/*.mjs`.replace(/\\/g, "/"), dest: "assets/bundled", rename: (name) => `ex-${name}.mjs` },
          { src: `${baremuxPath}/**/*.js`.replace(/\\/g, "/"), dest: "assets/bundled", rename: (name) => `bm-${name}.js` },
        ],
      }),
    ],
  },
});
