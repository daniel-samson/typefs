/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Type FS',
  tagline: 'A file storage package that provides a single interface to many types of filesystems.',
  url: 'https://daniel-samson.github.io/',
  baseUrl: '/typefs/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'daniel-samson', // Usually your GitHub org/user name.
  projectName: 't', // Usually your repo name.
  themeConfig: {
    navbar: {
      logo: {
        alt: 'T',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        // {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/daniel-samson/t',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        // {
        //   title: 'Community',
        //   items: [
        //     {
        //       label: 'Stack Overflow',
        //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
        //     },
        //     {
        //       label: 'Discord',
        //       href: 'https://discordapp.com/invite/docusaurus',
        //     },
        //     {
        //       label: 'Twitter',
        //       href: 'https://twitter.com/docusaurus',
        //     },
        //   ],
        // },
        {
          title: 'More',
          items: [
            // {
            //   label: 'Blog',
            //   to: 'blog/',
            // },
            {
              label: 'GitHub',
              href: 'https://github.com/daniel-samson/t',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} T. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/daniel-samson/t/edit/documentation/',
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        // },
      },
    ],
  ],
};
