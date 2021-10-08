/* eslint-disable max-len */
module.exports = {
    apps : [ {
      name: 'DB-API',
      script: 'build/app.js',
      log_date_format : 'YYYY-MM-DD HH:mm',
      instances: 'max',
      exec_mode : 'cluster',
      autorestart: true,
      env: {
        'NODE_ENV': 'development',
      },
      env_qa: {
        'NODE_ENV': 'qa',
      },
      env_production: {
        'NODE_ENV': 'production',
      },
    } ],
    deploy: {
      develop: {
        'user': 'encore',
        'host': 'api-db.dev.wocex.dom',
        'ref': 'origin/develop',
        'repo': 'git@git-develop.dev.wocex.dom:petro-app/db-api.git',
        'ssh_options': 'StrictHostKeyChecking=no',
        'path': '/home/encore/apli/db-api/',
        'post-deploy': 'npm i --no-optional && npm run ts && pm2 -a startOrGracefulReload ecosystem.config.js && pm2 save',
      },
    },
  };
  