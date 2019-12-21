module.exports = {
  apps: [
    {
      name: 'ban-exporter',
      script: './ban-exporter/index.js'
    },
    {
      name: 'ban-importer',
      script: './ban-importer/index.js'
    },
    {
      name: 'web-server',
      script: './web-server/index.js'
    }
  ]
};
