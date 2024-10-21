import { defineConfig } from "astro/config";
// import AutoImport from 'astro-auto-import';
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import lottie from "astro-integration-lottie";
import partytown from '@astrojs/partytown'
import SITE_DATA from "./src/consts";

// https://astro.build/config
export default defineConfig({
  site: SITE_DATA.site.url,
  integrations: [
    lottie(),
    mdx(),
    sitemap(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
});
