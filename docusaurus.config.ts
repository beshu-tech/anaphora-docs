import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Anaphora Docs',
  tagline: 'Automated Kibana Reports & Alerts',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  // Production URL
  url: 'https://docs.anaphora.it',
  baseUrl: '/',

  // GitHub pages deployment config
  organizationName: 'beshu-tech',
  projectName: 'anaphora-docs',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/beshu-tech/anaphora-docs/tree/main/',
          routeBasePath: '/',
        },
        blog: false, // Disable blog
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/anaphora-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Anaphora',
      logo: {
        alt: 'Anaphora Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/beshu-tech/anaphora-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/getting-started/',
            },
          ],
        },
        {
          title: 'Product',
          items: [
            {
              label: 'Anaphora Website',
              href: 'https://anaphora.it',
            },
            {
              label: 'Beshu Tech',
              href: 'https://beshu.tech',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/beshu-tech/anaphora-docs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Beshu Limited. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
