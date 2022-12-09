module.exports = {
  docs: [
    {
      type: 'category',
      label: 'Introduction',
      items: ['introduction'],
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        "getting-started/installation",
        "getting-started/configuration",
      ],
    },
    {
      type: 'category',
      label: 'How to',
      items: [
        "how-to/write-files",
        "how-to/read-files",
        "how-to/bulk-rename-files",
        "how-to/copy-to-disk",
      ],
    },
    {
      type: 'category',
      label: 'Upgrade Guide',
      items: [
        "migration/v2",
      ],
    },

    {
      type: 'category',
      label: 'API',
      items: [
        "api/storage",
        "api/disk-driver",
        "api/config",
      ],
    },
    {
      type: 'category',
      label: 'Drivers',
      items: [
        "drivers/file",
        "drivers/s3",
      ],
    },

    {
      type: 'category',
      label: 'Contributing',
      items: [
        "contributing/join",
        "contributing/processes",
      ],
    },

  ],
};
