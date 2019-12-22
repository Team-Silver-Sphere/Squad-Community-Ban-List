module.exports = {
  apps: [
    {
      name: 'ban-exporter',
      script: 'npm run start-ban-exporter'
    },
    {
      name: 'ban-importer',
      script: 'npm run start-ban-importer'
    },
    {
      name: 'web-server',
      script: 'npm run start-web-server',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};
