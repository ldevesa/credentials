// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';

import alpinejs from '@astrojs/alpinejs';

import react from "@astrojs/react";


// https://astro.build/config
export default defineConfig({
  base: '/credentials/',
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en", "pt"],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true
    },
    fallback: {
      en: "es"
    }
  },
  integrations: [tailwind(), icon(), alpinejs(), react()],
});