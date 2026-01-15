import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Anaphora Documentation',
  tagline: 'Automated Kibana & Grafana Reports, Alerts, and Dashboard Scheduling',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  // Enable Mermaid diagrams
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],

  // Production URL
  url: 'https://docs.anaphora.it',
  baseUrl: '/',

  // GitHub pages deployment config
  organizationName: 'beshu-tech',
  projectName: 'anaphora-docs',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  // SEO: Add head tags for social sharing and SEO
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'keywords',
        content: 'Kibana reports, Grafana reports, dashboard automation, scheduled reports, Elasticsearch alerts, PDF reports, Kibana PDF, automated reporting, observability reports',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'author',
        content: 'Beshu Tech',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:site_name',
        content: 'Anaphora Documentation',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'twitter:site',
        content: '@beslogorodsky',
      },
    },
  ],

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
          lastVersion: 'stable',
          versions: {
            current: {
              label: 'Pre-release',
              path: 'pre-release',
              banner: 'unreleased',
            },
            stable: {
              label: 'Stable',
              path: '',
            },
          },
        },
        blog: false, // Disable blog
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Social card image for link previews (og:image, twitter:image)
    image: 'img/anaphora-social-card.png',
    metadata: [
      {
        name: 'description',
        content: 'Anaphora automates Kibana and Grafana report generation. Schedule PDF reports, create conditional alerts, and deliver dashboards via email, Slack, or webhooks.',
      },
      {
        property: 'og:description',
        content: 'Automate Kibana & Grafana reports. Schedule PDF dashboards, create conditional alerts, deliver via email, Slack, or webhooks.',
      },
      {
        name: 'robots',
        content: 'index, follow',
      },
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Anaphora',
      logo: {
        alt: 'Anaphora Logo',
        src: 'img/logo.png',
        href: '/getting-started/',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
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
