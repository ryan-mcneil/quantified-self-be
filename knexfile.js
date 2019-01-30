// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/quantified_self',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'pg',
    debug: true,
    connection: 'postgres://febymtnmqqdgik:201c5d9d7163fa8caf89eefed55f3e3454628c28551b12a868addfb5187a3237@ec2-54-243-228-140.compute-1.amazonaws.com:5432/d1sgc6nfffhvn',
    migrations: {
      directory: './db/migrations'
    }
  }

};
