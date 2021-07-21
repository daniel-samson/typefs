/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Type FS',
  tagline: 'A file storage package that provides a single interface to many types of filesystems.',
  url: 'https://typefs.io/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'daniel-samson', // Usually your GitHub org/user name.
  projectName: 'typefs', // Usually your repo name.
  themeConfig: {
    navbar: {
      logo: {
        alt: 'TypeFS',
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
          href: 'https://github.com/daniel-samson/typefs',
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
              label: 'NPM',
              href: 'https://www.npmjs.com/package/typefs',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/daniel-samson/typefs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Type FS. Built with Docusaurus.`,
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
            'https://github.com/daniel-samson/typefs/edit/documentation/',
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
