module.export = {
  default: 'app',
  disks: {
    app: {
      driver: 'file',
      root: '/app',
      jail: true,
    },
  },
};
