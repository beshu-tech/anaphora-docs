import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      link: {
        type: 'doc',
        id: 'getting-started/index',
      },
      items: [
        'getting-started/jobs',
        'getting-started/general-settings',
        'getting-started/basic-capture',
        'getting-started/advanced-capture',
      ],
    },
    {
      type: 'category',
      label: 'Delivery Interfaces',
      items: ['delivery-interfaces/index'],
    },
    {
      type: 'category',
      label: 'Runs',
      items: ['runs/index'],
    },
    {
      type: 'category',
      label: 'Settings',
      items: ['settings/index'],
    },
    {
      type: 'category',
      label: 'Data',
      items: ['data/index'],
    },
  ],
};

export default sidebars;
