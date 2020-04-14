module.exports = {
  apps: [
    {
      name: 'ban-generator',
      script: 'npm run start-ban-generator'
    },
    {
      name: 'battlemetrics-gateway',
      script: 'npm run start-battlemetrics-gateway'
    },
    {
      name: 'tt-gateway',
      script: 'npm run start-tt-gateway'
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
