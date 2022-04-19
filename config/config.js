const env = process.env.NODE_ENV || "dev"

const dev = {
  app: {
    port: parseInt(process.env.port) || 4000,
  },
  db: {
    host: 'localhost',
    port: 27017,
  },
  mongoose: { // https://mongoosejs.com/docs/connections.html
    useNewUrlParser: true,
    dbName: 'nosql_model',
    poolSize: 5,
  },
  settings: {
    logging: true,
    useCreateIndex: true,
  }
}

const test = {
}

const production = {
  app: {
    port: parseInt(process.env.port) || 4000,
  },
  db: {
    host: 'revivarqdb',
    port: 27017,
  },
  mongoose: { // https://mongoosejs.com/docs/connections.html
    useNewUrlParser: true,
    user: 'root',
    pass: 'senha',
    dbName: 'nosql_model',
    poolSize: 5,
  },
  settings: {
    logging: true,
    useCreateIndex: true,
  }
}

const config = {
  dev,
  test,
  production
}

module.exports = config[env]
