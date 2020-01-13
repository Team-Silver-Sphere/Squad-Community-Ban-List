module.exports = {
  apps: [
    {
      name: 'ban-exporter',
      script: 'npm run start-ban-generator'
    },
    {
      name: 'ban-importer',
      script: 'npm run start-battlemetrics-gateway'
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
