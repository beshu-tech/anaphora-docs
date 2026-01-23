import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      link: {
        type: 'doc',
        id: 'getting-started/index',
      },
      items: [
        'getting-started/installation',
        'getting-started/features',
        'getting-started/configuration',
      ],
    },
    {
      type: 'category',
      label: 'Basic Examples',
      link: {
        type: 'doc',
        id: 'basic-examples/index',
      },
      items: [
        'basic-examples/kibana-dashboard-report',
        'basic-examples/kibana-alert',
        'basic-examples/kibana-conditional-report',
        'basic-examples/grafana-dashboard-report',
      ],
    },
    {
      type: 'category',
      label: 'Advanced Examples',
      link: {
        type: 'doc',
        id: 'advanced-examples/index',
      },
      items: [
        'advanced-examples/mixed-sources-report',
        'advanced-examples/kibana-anomaly-alert',
        'advanced-examples/ai-news-collation',
      ],
    },
    {
      type: 'category',
      label: 'Jobs',
      link: {
        type: 'doc',
        id: 'jobs/index',
      },
      items: [
        'jobs/general',
        'jobs/capture',
        'jobs/composer',
        'jobs/delivery',
      ],
    },
    {
      type: 'category',
      label: 'Delivery Interfaces',
      link: {
        type: 'doc',
        id: 'delivery-interfaces/index',
      },
      items: [
        'delivery-interfaces/smtp',
        'delivery-interfaces/mailgun',
        'delivery-interfaces/slack',
        'delivery-interfaces/s3',
        'delivery-interfaces/webhook',
      ],
    },
    {
      type: 'category',
      label: 'Administration',
      link: {
        type: 'doc',
        id: 'administration/index',
      },
      items: [
        {
          type: 'category',
          label: 'Authentication',
          link: {
            type: 'doc',
            id: 'administration/authentication/index',
          },
          items: [
            'administration/authentication/local',
            'administration/authentication/ldap',
            'administration/authentication/saml',
            'administration/authentication/oidc',
          ],
        },
        'administration/spaces',
        'administration/ai-providers',
        'administration/self-monitoring',
        'administration/backup',
      ],
    },
    {
      type: 'category',
      label: 'Data Retention',
      link: {
        type: 'doc',
        id: 'data-retention/index',
      },
      items: [
        'data-retention/runs',
        'data-retention/reports',
      ],
    },
    'changelog',
  ],
};

export default sidebars;
