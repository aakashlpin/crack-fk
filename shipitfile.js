module.exports = function (shipit) {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      workspace: '/tmp/github-monitor',
      deployTo: '/tmp/deploy_to',
      branch: 'master',
      repositoryUrl: 'https://github.com/aakashlpin/crack-fk.git',
      ignores: ['.git', 'node_modules'],
      rsync: ['--del'],
      keepReleases: 2,
      key: '/Users/aakashlpin/.ssh/id_rsa',
      shallowClone: true
    },
    production: {
      servers: 'aakashlpin@flipkart.cheapass.in'
    },
  });

  shipit.task('start', function () {
    return shipit.remote('cd /tmp/deploy_to/current && npm i --verbose').then(function () {
      shipit.remote('cd /tmp/deploy_to/current && mkdir logs && npm run start').then(function () {
        shipit.log('all done');
      })
    })
  })
}
